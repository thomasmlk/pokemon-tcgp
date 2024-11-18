"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FiltersProps {
  selectedPack: string;
  setSelectedPack: (value: string) => void;
  query: string;
  handleReset: () => void; // Ajoutez cette ligne pour définir correctement `handleReset`
}

export function Filters({
  selectedPack,
  setSelectedPack,
  query,
  handleReset,
}: FiltersProps) {
  const router = useRouter(); // 🌟 Utilisation de useRouter
  const searchParams = useSearchParams(); // 🌟 Utilisation de useSearchParams

  // 🌟 Fonction pour mettre à jour l'URL avec le paramètre `pack`
  const handleSelectPack = (value: string) => {
    setSelectedPack(value);

    // Mise à jour de l'URL avec le paramètre `pack`
    const currentQuery = searchParams.get("query") || "";
    router.push(`/pokedex?pack=${value}&query=${currentQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <Input
        className="w-full truncate"
        placeholder="Search for a Pokémon..."
        defaultValue={query}
      />

      <Select
        value={selectedPack}
        onValueChange={(value) => handleSelectPack(value)}
      >
        <SelectTrigger className="w-full md:w-1/4">
          <SelectValue placeholder="Select a Pack" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Packs</SelectItem>
          <SelectItem value="apex-mewtwo">Apex Mewtwo</SelectItem>
          <SelectItem value="apex-charizard">Apex Charizard</SelectItem>
          <SelectItem value="apex-pikachu">Apex Pikachu</SelectItem>
        </SelectContent>
      </Select>

      {/* Bouton pour réinitialiser les Pokémon capturés */}
      <Button variant="ghost" className="text-red-500" onClick={handleReset}>
        <span className="flex">Reset Pokédex</span>
      </Button>
    </div>
  );
}
