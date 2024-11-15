"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import allDex from "@/app/pokedex/dex.json";

export default function DexNav() {
  const router = useRouter();
  const params = useParams();
  const pack = params?.pack as string;
  const name = params?.name as string;

  // État pour stocker les informations du Pokémon
  const [pokemonData, setPokemonData] = useState<any>(null);

  useEffect(() => {
    // Trouver le Pokémon correspondant
    const pokemon = allDex.find(
      (dex) =>
        dex.pack.toLowerCase() === pack.toLowerCase() &&
        dex.name.toLowerCase() === name.toLowerCase()
    );
    setPokemonData(pokemon);
  }, [pack, name]);

  if (!pokemonData) {
    return <p>Loading...</p>;
  }
  return (
    <div className="mt-24 lg:mt-36 max-w-screen-md mx-auto px-5 flex flex-col gap-10">
      <div className="h-11 px-5 flex gap-3 rounded-full justify-center items-center w-fit bg-background shadow-lg shadow-foreground/10">
        <ArrowLeft className="h-7 w-7" />
        <p className="font-semibold">Retour au Pokédex</p>
      </div>
      <div className="grid md:grid-cols-2">
        <div className="relative w-full aspect-[7.2/10]">
          <Image
            src={pokemonData.image}
            alt={pokemonData.name}
            fill
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}
