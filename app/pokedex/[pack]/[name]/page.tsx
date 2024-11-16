"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getRarityIcons } from "@/app/utils/getRarityIcons";
import { getPackIcons } from "@/app/utils/getPackIcons";
import Image from "next/image";
import { MoveLeft } from "lucide-react";
import allDex from "@/app/pokedex/dex.json";

interface Pokemon {
  id: string;
  name: string;
  pack: string;
  image: string;
  rarity: string;
}

export default function DexNav() {
  const params = useParams();
  const pack = params?.pack as string;
  const name = params?.name as string;

  // État pour stocker les informations du Pokémon
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

  useEffect(() => {
    const pokemon = allDex.find(
      (dex) =>
        dex.pack.toLowerCase() === pack.toLowerCase() &&
        dex.name.toLowerCase() === name.toLowerCase()
    );
    setPokemonData(pokemon || null); // Si aucun Pokémon n'est trouvé, on définit `null`
  }, [pack, name]);

  if (!pokemonData) {
    return <p>Loading...</p>;
  }

  const rarityIcons = getRarityIcons(pokemonData.rarity);
  const packIcons = getPackIcons(pokemonData.pack);

  return (
    <div className="my-24 lg:my-36 max-w-screen-xl mx-auto px-5 flex flex-col gap-10">
      <button className="h-11 px-5 flex gap-3 rounded-full justify-center items-center w-fit bg-background shadow-lg shadow-foreground/10">
        <MoveLeft className="h-5 w-5" />
        <p className="font-semibold">Retour au Pokédex</p>
      </button>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mx-auto max-w-screen-md">
          <div className="relative w-full aspect-[7.2/10] shadow-2xl shadow-foreground/40 rounded-lg">
            <Image
              src={pokemonData.image}
              alt={pokemonData.name}
              fill
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-2xl tracking-tight">
              {pokemonData.name}
            </h1>
            <div className="flex gap-1">
              {rarityIcons.map((icon, i) => (
                <Image
                  key={i}
                  src={icon}
                  alt={`Rarity ${i + 1}`}
                  width={14}
                  height={14}
                />
              ))}
            </div>
            <div className="flex h-11 px-5 rounded-full shadow-xl shadow-foreground/10 items-center justify-around">
              <div className="relative">
                <Image
                  src={packIcons as string}
                  alt="Pack"
                  width={44}
                  height={44}
                />
              </div>
              <div className="bg-background shadow-neumorphism px-5 rounded-full">
                <p className="font-bold">{pokemonData.id}/226</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
