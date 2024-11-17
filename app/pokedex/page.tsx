"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getRarityIcons } from "@/app/utils/getRarityIcons";
import { getPackIcons } from "@/app/utils/getPackIcons";
import allDex from "@/app/pokedex/api/fetchCards";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import { RotateCcw } from "lucide-react";

export default function Pokedex() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const collectionSvg = "/pokedex/collection.svg";

  // État pour garder les informations des Pokémon capturés
  const [caughtPokemons, setCaughtPokemons] = useState<{
    [key: string]: boolean;
  }>({});

  // Charger l'état depuis le localStorage au chargement du composant
  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("caughtPokemons") || "{}"
    );
    setCaughtPokemons(storedData);
  }, []);

  // Fonction pour gérer la capture du Pokémon
  const handleCatch = (id: string) => {
    const updatedCaughtPokemons = {
      ...caughtPokemons,
      [id]: !caughtPokemons[id], // Inverser l'état de capture
    };
    setCaughtPokemons(updatedCaughtPokemons);
    localStorage.setItem(
      "caughtPokemons",
      JSON.stringify(updatedCaughtPokemons)
    );
  };

  const handleReset = () => {
    setCaughtPokemons({});
    localStorage.removeItem("caughtPokemons");
  };
  const pathname = usePathname();
  if (!pathname) return null;
  return (
    <div className="px-5 my-24 lg:my-36 flex flex-col gap-10 max-w-screen-xl mx-auto">
      {/* Header de la collection */}
      <div className="bg-background relative flex overflow-hidden justify-center items-center w-full p-14 rounded-t-xl shadow-lg shadow-foreground/15">
        <h1 className="font-bold text-2xl tracking-tight z-10">Collection</h1>
        <div className="absolute w-full h-full md:bottom-5">
          <Image src={collectionSvg} alt="" objectFit="cover" fill />
        </div>
        <div className="absolute bottom-0 h-1 bg-gradient-to-r from-orange-400 via-fuchsia-400 to-sky-400 w-full"></div>
      </div>

      <div className="flex gap-5">
        {/* Barre de recherche */}
        <Input className="w-full" placeholder="Search for a Pokémon..."></Input>
        <Button variant="ghost" className="text-red-500" onClick={handleReset}>
          <span className="hidden md:flex">Reset Pokédex</span>
          <RotateCcw className="h-11 w-11 flex md:hidden" />
        </Button>
      </div>
      {/* Grille de Pokémon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-5 gap-y-10 md:gap-y-20 md:gap-x-10 mt-10">
        {allDex
          .filter((dex) => {
            return dex.name.toLowerCase().includes(query.toLowerCase());
          })
          .map((dex, i) => {
            const isCaught = caughtPokemons[dex.name as string] || false;

            const packIcons = getPackIcons(dex.pack);
            const rarityIcons = getRarityIcons(dex.rarity);

            return (
              <div
                key={i}
                className="relative group flex flex-col gap-4 md:gap-0"
              >
                {/* Carte Pokémon */}
                <Link
                  href={`${pathname}/${dex.pack}/${dex.name.toLowerCase()}`}
                >
                  <div
                    className={`w-full h-full md:bottom-5 aspect-[7.2/10] relative rounded-lg overflow-hidden shadow-2xl shadow-foreground/40 md:group-hover:scale-105 transition-all duration-700 ease-in-out ${
                      isCaught ? "" : "grayscale"
                    }`}
                  >
                    <Image
                      src={dex.image}
                      alt={dex.name}
                      objectFit="cover"
                      fill
                      className="absolute"
                      quality={100}
                    />
                  </div>
                </Link>

                {/* Bouton pour attraper ou relâcher le Pokémon */}
                <Button
                  onClick={() => handleCatch(dex.name as string)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl shadow-foreground/25"
                  variant="default"
                  size="sm"
                >
                  {isCaught ? (
                    <span>Release</span>
                  ) : (
                    <span>Catch {dex.name}</span>
                  )}
                </Button>
                <div className="flex justify-between relative">
                  <div className="flex gap-1">
                    {rarityIcons.map((icon, i) => (
                      <Image
                        key={i}
                        src={icon}
                        alt="Rarity"
                        width={14}
                        height={14}
                      />
                    ))}
                  </div>
                  <div className="h-full w-10 relative">
                    <Image
                      src={packIcons as string}
                      alt={dex.pack}
                      fill
                      objectFit="contain"
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
