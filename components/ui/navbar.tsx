"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const navigation = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Pokédex",
      path: "/pokedex",
    },
    {
      label: "Community",
      path: "/community",
    },
    {
      label: "Stats",
      path: "/stats",
    },
    {
      label: "Settings",
      path: "/settings",
    },
  ];
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="fixed flex justify-center w-full top-6 z-50">
    <div className="flex h-14 gap-2 w-fit px-2 bg-background shadow-lg shadow-foreground/10 justify-center items-center rounded-full">
        {navigation.map((nav, i) => {
          const isActive =
            pathname === nav.path || pathname.startsWith(nav.path + "/");
          return (
            <Link
              key={i}
              href={nav.path}
              className={`h-10 px-4 rounded-full flex items-center justify-center text-sm font-semibold ${
                isActive ? "border-2 border-cyan-300" : ""
              }`}
            >
              {nav.label}
            </Link>
          );
        })}

    </div>
    </nav>
  );
}
