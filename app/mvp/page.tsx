"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface FavoriteCharacter {
  id: string;
  character_name: string;
  image: string;
  movie: string;
}

interface Character {
  _id: number;
  name: string;
  imageUrl: string;
  films: string[];
}

export default function MVPPage() {
  const [characters, setCharacters] =
    useState<Character[]>([]);

  const [favorites, setFavorites] =
    useState<FavoriteCharacter[]>([]);

  const [message, setMessage] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState<boolean>(true);

  // -----------------------------------
  // CARGAR PERSONAJES DISNEY
  // -----------------------------------

  const fetchCharacters = async () => {
    try {
      const res = await fetch(
        "https://api.disneyapi.dev/character"
      );

      const data = await res.json();

      setCharacters(data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------------
  // CARGAR FAVORITOS DEL USUARIO
  // -----------------------------------

  const fetchFavorites = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Debes iniciar sesión");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error(error.message);
    } else {
      setFavorites(data || []);
    }

    setLoading(false);
  };

  // -----------------------------------
  // GUARDAR FAVORITO
  // -----------------------------------

  const saveFavorite = async (
    character: Character
  ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage(
        "Debes iniciar sesión"
      );
      return;
    }

    const { error } = await supabase
      .from("favorites")
      .insert([
        {
          user_id: user.id,
          character_name:
            character.name,
          image:
            character.imageUrl,
          movie:
            character.films?.[0] ||
            "Disney",
        },
      ]);

    if (error) {
      setMessage(
        "Error al guardar personaje"
      );
    } else {
      setMessage(
        "Personaje guardado"
      );

      fetchFavorites();
    }
  };

  // -----------------------------------
  // INICIO
  // -----------------------------------

  useEffect(() => {
    fetchCharacters();
    fetchFavorites();
  }, []);

  if (loading)
    return (
      <p className="text-center text-white mt-10">
        Cargando...
      </p>
    );

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-8">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-bold">
          Disney+
        </h1>

        <button className="bg-[#1f80ff] px-5 py-2 rounded-lg">
          Mi Perfil
        </button>
      </div>

      {/* MENSAJE */}

      {message && (
        <p className="mb-5 text-center">
          {message}
        </p>
      )}

      {/* PERSONAJES */}

      <h2 className="text-3xl font-semibold mb-6">
        Personajes Populares
      </h2>

      <div className="grid grid-cols-5 gap-6 mb-14">
        {characters.map((char) => (
          <div
            key={char._id}
            className="bg-[#121826] rounded-2xl overflow-hidden hover:scale-105 transition"
          >
            <img
              src={char.imageUrl}
              alt={char.name}
              className="w-full h-[320px] object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg">
                {char.name}
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                {char.films?.[0] ||
                  "Disney"}
              </p>

              <button
                onClick={() =>
                  saveFavorite(char)
                }
                className="bg-[#1f80ff] w-full mt-4 py-2 rounded-lg"
              >
                Guardar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAVORITOS */}

      <h2 className="text-3xl font-semibold mb-6">
        Mis Favoritos
      </h2>

      {favorites.length === 0 ? (
        <p className="text-gray-400">
          No tienes favoritos aún.
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="bg-[#121826] rounded-2xl overflow-hidden"
            >
              <img
                src={fav.image}
                alt={
                  fav.character_name
                }
                className="w-full h-[250px] object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold">
                  {
                    fav.character_name
                  }
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  {fav.movie}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}