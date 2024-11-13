"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import allDex from "@/app/pokedex/api/fetchCards";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="px-5 mt-24 lg:mt-36 flex flex-col gap-10 max-w-screen-xl mx-auto">
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
          <Input
            className="w-full"
            placeholder="Search for a Pokémon..."
          ></Input>
          <Button
            variant="ghost"
            className="text-red-500"
            onClick={handleReset}
          >
            Réinitialiser le Pokédex
          </Button>
        </div>
        {/* Grille de Pokémon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mt-10">
          {allDex
            .filter((dex) => {
              return dex.name.toLowerCase().includes(query.toLowerCase());
            })
            .map((dex, i) => {
              const isCaught = caughtPokemons[dex.name as string] || false;

              return (
                <div key={i} className="relative">
                  {/* Carte Pokémon */}
                  <div
                    className={`w-full h-full md:bottom-5 aspect-[7.2/10] relative rounded-lg overflow-hidden shadow-2xl shadow-foreground/40 ${
                      isCaught ? "opacity-100" : "opacity-40 grayscale"
                    } transition-all duration-300`}
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

                  {/* Bouton pour attraper ou relâcher le Pokémon */}
                  <Button
                    onClick={() => handleCatch(dex.name as string)}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl shadow-foreground/25"
                    variant="default"
                    size="sm"
                  >
                    {isCaught ? <span>Relâcher</span> : <span>Attraper</span>}
                  </Button>
                </div>
              );
            })}
        </div>
      </div>
    </Suspense>
  );
}
