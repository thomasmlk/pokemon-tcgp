import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

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
  return (
    <div className="flex gap-5">
      <Input
        className="w-full truncate"
        placeholder="Search for a Pokémon..."
        defaultValue={query}
      />

      <Select
        value={selectedPack}
        onValueChange={(value) => setSelectedPack(value)}
      >
        <SelectTrigger className="w-1/4">
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
        <span className="hidden md:flex">Reset Pokédex</span>
        <RotateCcw className="h-11 w-11 flex md:hidden" />
      </Button>
    </div>
  );
}
