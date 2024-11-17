"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Menu, X } from "lucide-react";
import { Button } from "./button";

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
      label: "Events",
      path: "/events",
    },
    {
      label: "Community",
      path: "/community",
    },
    {
      label: "Stats",
      path: "/stats",
    },
  ];
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div className="flex md:hidden fixed z-50 top-6 right-6">
        <Button
          variant="ghost"
          size="icon"
          aria-controls="mobile-menu"
          aria-expanded="false"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}
        </Button>
      </div>

      <nav className={`${isMenuOpen ? "flex" : "hidden"}`}>
        <div className="flex flex-col justify-center gap-6 items-center h-lvh w-full fixed bg-background/95 backdrop-blur-xl z-40 top-0">
          {navigation.map((nav, i) => {
            const isActive =
              pathname === nav.path || pathname.startsWith(nav.path + "/");
            return (
              <Link
                key={i}
                href={nav.path}
                className={`font-semibold text-2xl p-4 rounded-full ${
                  isActive ? "border-2 border-cyan-300" : ""
                }`}
                onClick={toggleMenu}
              >
                {nav.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <nav className="hidden fixed md:flex left-1/2 -translate-x-1/2 top-6 z-50">
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
    </>
  );
}
