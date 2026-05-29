"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Page() {

  const router = useRouter();

  useEffect(() => {

    const checkUser = async () => {

      const {
        data: { session },
      } = await supabase.auth.getSession();

      // SI HAY SESION -> HOME

      if (session) {

        router.push("/home");

      } else {

        // SI NO HAY SESION -> LOGIN

        router.push("/login");
      }
    };

    checkUser();

  }, []);

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a]">

      <div className="text-center fade-in">

        <h1 className="text-6xl font-bold text-white mb-4">
          Disney+
        </h1>

        <p className="text-gray-400 text-lg">
          Loading...
        </p>

      </div>

    </div>
  );
}