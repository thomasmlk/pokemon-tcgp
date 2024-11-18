"use client";

import { useSearchParams } from "next/navigation";
import { usePokedex } from "@/hooks/usePokedex";
import { PokedexHeader } from "@/app/pokedex/components/ui/PokedexHeader";
import { Filters } from "@/app/pokedex/components/ui/Filters";
import { PokemonCard } from "@/app/pokedex/components/ui/PokemonCards";
import allDex from "@/app/pokedex/api/fetchCards";

export default function Pokedex() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const {
    caughtPokemons,
    selectedPack,
    setSelectedPack,
    handleCatch,
    handleReset,
  } = usePokedex();

  return (
    <div className="px-5 my-24 lg:my-36 flex flex-col gap-10 max-w-screen-xl mx-auto">
      {/* Header */}
      <PokedexHeader />

      {/* Filters */}
      <Filters
        selectedPack={selectedPack}
        setSelectedPack={setSelectedPack}
        query={query}
        handleReset={handleReset}
      />

      {/* Pokémon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-5 gap-y-10 md:gap-y-20 md:gap-x-10 mt-10">
        {allDex
          .filter(
            (dex) =>
              dex.name.toLowerCase().includes(query.toLowerCase()) &&
              (selectedPack === "all" || dex.pack === selectedPack)
          )
          .map((dex, i) => {
            const isCaught = caughtPokemons[dex.name] || false;
            return (
              <PokemonCard
                key={i}
                dex={dex}
                isCaught={isCaught}
                handleCatch={handleCatch}
              />
            );
          })}
      </div>
    </div>
  );
}
