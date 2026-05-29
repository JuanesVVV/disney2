"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  telefono: string | null;
}

export default function UsuarioPage() {

  const router = useRouter();

  const [usuario, setUsuario] =
    useState<Usuario | null>(null);

  const [nombre, setNombre] =
    useState<string>("");

  const [telefono, setTelefono] =
    useState<string>("");

  const [mensaje, setMensaje] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState<boolean>(true);
    const [message, setMessage] = useState<string | null>(null);

  // -------------------------------------
  // CARGAR USUARIO
  // -------------------------------------

  const fetchUsuario = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      setMensaje(
        "No hay usuario logueado"
      );

      setLoading(false);

      return;
    }

    const { data, error } =
      await supabase
        .from("usuarios")
        .select(
          "id, nombre, correo, telefono"
        )
        .eq("id", user.id)
        .single();

    if (error) {

      console.error(
        "Error al cargar usuario:",
        error.message
      );

      setMensaje(
        "No se encontró el usuario"
      );

    } else if (data) {

      setUsuario(data);

      setNombre(data.nombre);

      setTelefono(
        data.telefono || ""
      );
    }

    setLoading(false);
  };

  // -------------------------------------
  // ACTUALIZAR PERFIL
  // -------------------------------------

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    if (!usuario) return;

    const { error } =
      await supabase
        .from("usuarios")
        .update({
          nombre,
          telefono,
        })
        .eq("id", usuario.id);

    if (error) {

      setMensaje(
        "Error al actualizar perfil"
      );

    } else {

      setMensaje(
        "Perfil actualizado"
      );

      fetchUsuario();
    }
  };

// -------------------------------------
// CERRAR SESION
// -------------------------------------

const handleLogout = async () => {

  await supabase.auth.signOut();

  router.push("/login");
};

  // -------------------------------------
  // INICIO
  // -------------------------------------

  useEffect(() => {

    fetchUsuario();

  }, []);

  if (loading)
    return (
      <p className="text-center text-white mt-10">
        Cargando...
      </p>
    );

    //validacion

    useEffect(() => {
      const checkUser = async () => {
        const { data } = await supabase.auth.getUser();
        if (!data.user) {
          // ❌ No hay usuario logueado → redirige a login
          router.push("/login");
        } else {
          // ✅ Usuario logueado, seguimos con la página
          setLoading(false);
        }
      };
      checkUser();
    }, [router]);

  // -------------------------------------
  // INTERFAZ
  // -------------------------------------

  return (

    <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-[#121826] rounded-2xl p-8 shadow-2xl">

        <h1 className="text-white text-4xl font-bold text-center mb-8">
          Mi Perfil
        </h1>

        {usuario ? (

          <form
            onSubmit={handleUpdate}
            className="flex flex-col gap-4"
          >

            {/* NOMBRE */}

            <input
              type="text"
              value={nombre}
              onChange={(e) =>
                setNombre(
                  e.target.value
                )
              }
              placeholder="Nombre"
              required
              className="bg-[#1b2436] text-white p-3 rounded-lg outline-none"
            />

            {/* TELEFONO */}

            <input
              type="text"
              value={telefono}
              onChange={(e) =>
                setTelefono(
                  e.target.value
                )
              }
              placeholder="Teléfono"
              className="bg-[#1b2436] text-white p-3 rounded-lg outline-none"
            />

            {/* CORREO */}

            <input
              type="email"
              value={usuario.correo}
              readOnly
              className="bg-[#0f1725] text-gray-400 p-3 rounded-lg"
            />

            {/* BOTON */}

            <button
              type="submit"
              className="bg-[#1f80ff] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Guardar cambios
            </button>

          </form>

        ) : (

          <p className="text-center text-gray-400">
            {mensaje}
          </p>

        )}

        {/* 📴 Botón para cerrar sesión, esto va en el return */}
        <button
        onClick={handleLogout}
        className="bg-gray-400 text-white p-2 rounded mt-4 w-full"
        >
          Cerrar sesión
          </button>

        {/* MENSAJE */}

        {mensaje && (

          <p className="text-center text-gray-300 mt-5">
            {mensaje}
          </p>

        )}

      </div>

    </div>
  );
}