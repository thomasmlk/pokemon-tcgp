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
  packtype: string;
  image: string;
  rarity: string;
  illustrator: string;
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

      <div className="flex w-full flex-col md:flex-row items-center md:items-start gap-14 mx-auto max-w-screen-md">
        <div className="relative basis-2/5 mx-auto w-full aspect-[7.2/10] shadow-2xl shadow-foreground/40 rounded-lg">
          <Image
            src={pokemonData.image}
            alt={pokemonData.name}
            fill
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col gap-14 items-center md:items-start w-full basis-3/5">
          <div className="flex flex-col gap-7 w-full">
            <div className="flex flex-col md:flex-row gap-3 items-center w-full">
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
            </div>
            <div className="flex h-11 px-5 rounded-full w-full shadow-xl shadow-foreground/10 items-center justify-around">
              <div className="relative basis-1/3">
                <Image
                  src={packIcons as string}
                  alt="Pack"
                  width={44}
                  height={44}
                />
              </div>
              <div className="bg-background basis-2/3 shadow-neumorphism px-2 rounded-full h-7 flex justify-around items-center gap-4">
                <p className="font-bold text-white px-4 bg-foreground h-fit rounded-sm">
                  {pokemonData.packtype}
                </p>
                <p className="font-bold">{pokemonData.id}/226</p>
              </div>
            </div>
            <div className="bg-background flex items-center shadow-neumorphism rounded-full h-7 w-full overflow-hidden">
              <div className="flex h-full basis-1/3 bg-accent justify-center mix-blend-multiply items-center">
                <p className="font-semibold">Illustration</p>
              </div>
              <div className="flex h-full basis-2/3 px-8 items-center">
                <p className="font-medium">{pokemonData.illustrator}</p>
              </div>
            </div>
          </div>
          <div className="bg-background flex justify-center items-center shadow-neumorphism rounded-full h-7 w-full overflow-hidden">
            <div className="mix-blend-multiply w-full bg-accent flex h-full px-8 justify-center items-center">
              <p className="font-semibold">Moves</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="bg-background flex items-center shadow-neumorphism rounded-full h-7 w-full overflow-hidden">
              <div className="flex h-full justify-center basis-1/3 bg-accent mix-blend-multiply items-center">
                <p className="font-semibold">Pokémon</p>
              </div>
              <div className="flex h-full basis-2/3 px-8 items-center">
                <p className="font-medium">Base</p>
              </div>
            </div>
            <div className="bg-background flex items-center shadow-neumorphism rounded-full h-7 w-full overflow-hidden">
              <div className="flex h-full basis-1/3 justify-center bg-accent mix-blend-multiply items-center">
                <p className="font-semibold">Type</p>
              </div>
              <div className="flex h-full basis-2/3 px-8 items-center">
                <p className="font-medium">Pokémon type</p>
              </div>
            </div>
            <div className="bg-background flex items-center shadow-neumorphism rounded-full h-7 w-full overflow-hidden">
              <div className="flex h-full basis-1/3 justify-center bg-accent mix-blend-multiply items-center">
                <p className="font-semibold">PV</p>
              </div>
              <div className="flex h-full basis-2/3 px-8 items-center">
                <p className="font-medium">150</p>
              </div>
            </div>
            <div className="bg-background flex items-center shadow-neumorphism rounded-full h-7 w-full overflow-hidden">
              <div className="flex h-full basis-1/3 bg-accent justify-center mix-blend-multiply items-center">
                <p className="font-semibold">Weakness</p>
              </div>
              <div className="flex h-full basis-2/3 px-8 items-center">
                <p className="font-medium">Pokémon weakness</p>
              </div>
            </div>
            <div className="bg-background flex items-center shadow-neumorphism rounded-full h-7 w-full overflow-hidden">
              <div className="flex h-full basis-1/3 bg-accent justify-center mix-blend-multiply items-center">
                <p className="font-semibold">Retreat</p>
              </div>
              <div className="flex h-full basis-2/3 px-8 items-center">
                <p className="font-medium">Retreat cost</p>
              </div>
            </div>
            <div className="bg-background flex items-center shadow-neumorphism rounded-full h-7 w-full overflow-hidden">
              <div className="flex h-full basis-1/3 bg-accent justify-center mix-blend-multiply items-center">
                <p className="font-semibold">Serie</p>
              </div>
              <div className="flex h-full basis-2/3 px-8 items-center">
                <p className="font-medium">A</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
