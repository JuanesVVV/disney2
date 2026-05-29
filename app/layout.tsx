"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();

  return (
    <html lang="en">
      <body>

        {/* NAVBAR */}

        <nav className="w-full bg-[#121826] border-b border-[#1b2436] px-8 py-4 flex items-center justify-between">

          {/* LOGO */}

          <Link
            href="/home"
            className="text-white text-3xl font-bold"
          >
            Disney+
          </Link>

          {/* LINKS */}

          <div className="flex items-center gap-6">

            <Link
              href="/home"
              className={`text-sm font-medium transition ${
                pathname === "/home"
                  ? "text-[#1f80ff]"
                  : "text-white"
              }`}
            >
              Inicio
            </Link>

            <Link
              href="/mvp"
              className={`text-sm font-medium transition ${
                pathname === "/mvp"
                  ? "text-[#1f80ff]"
                  : "text-white"
              }`}
            >
              Favoritos
            </Link>

            <Link
              href="/user"
              className={`text-sm font-medium transition ${
                pathname === "/user"
                  ? "text-[#1f80ff]"
                  : "text-white"
              }`}
            >
              Perfil
            </Link>

          </div>
        </nav>

        {/* CONTENIDO */}

        <main>
          {children}
        </main>

      </body>
    </html>
  );
}