"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/home");
  };

const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center">
      <div className="w-[400px] bg-[#121826] p-8 rounded-2xl">
        <h1 className="text-white text-4xl font-bold text-center mb-8">
          Disney
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="bg-[#1b2436] text-white p-3 rounded-lg outline-none"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="bg-[#1b2436] text-white p-3 rounded-lg outline-none"
          />

          <button className="bg-[#1f80ff] text-white p-3 rounded-lg font-semibold">
            Iniciar sesión
          </button>
        </form>

        <button
          onClick={() =>
            router.push("/register")
          }
          className="text-[#1f80ff] mt-5 w-full"
        >
          Crear cuenta
        </button>

        <p className="text-red-400 text-center mt-4">
          {message}
        </p>
      </div>
    </div>
  );
}