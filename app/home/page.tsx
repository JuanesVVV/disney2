import { useEffect, useState } from "react";

interface Character {
  _id: number;
  name: string;
  imageUrl: string;
}

export default function HomePage() {
  const [characters, setCharacters] =
    useState<Character[]>([]);

  useEffect(() => {
    fetch(
      "https://api.disneyapi.dev/character"
    )
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f1a] p-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-white text-5xl font-bold">
          Disney
        </h1>

        <button className="bg-[#1f80ff] text-white px-5 py-2 rounded-lg">
          Perfil
        </button>
      </div>

      <h2 className="text-white text-2xl mb-6">
        Personajes populares
      </h2>

      <div className="grid grid-cols-5 gap-6">
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
              <h2 className="text-white text-lg font-semibold">
                {char.name}
              </h2>

              <button className="bg-[#1f80ff] text-white w-full mt-4 p-2 rounded-lg">
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}