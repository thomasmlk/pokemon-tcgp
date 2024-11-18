import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getRarityIcons } from "@/utils/getRarityIcons";
import { getPackIcons } from "@/utils/getPackIcons";

interface PokemonCardProps {
  dex: any;
  isCaught: boolean;
  handleCatch: (id: string) => void;
}

export function PokemonCard({ dex, isCaught, handleCatch }: PokemonCardProps) {
  const { pack, name, image, rarity } = dex;
  const rarityIcons = getRarityIcons(rarity);
  const packIcons = getPackIcons(pack);

  return (
    <div className="relative group flex flex-col gap-4">
      <Link href={`/pokedex/${pack}/${name.toLowerCase()}`}>
        <div
          className={`w-full h-full aspect-[7.2/10] relative rounded-lg overflow-hidden shadow-2xl shadow-foreground/40 ${
            isCaught ? "" : "grayscale"
          }`}
        >
          <Image
            src={image}
            alt={name}
            objectFit="cover"
            fill
            className="absolute"
            quality={100}
          />
        </div>
      </Link>

      <Button
        onClick={() => handleCatch(name)}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl shadow-foreground/25"
        variant="default"
        size="sm"
      >
        {isCaught ? "Release" : `Catch ${name}`}
      </Button>
      <div className="flex justify-between relative">
        <div className="flex gap-1">
          {rarityIcons.map((icon, i) => (
            <Image
              key={i}
              src={icon}
              alt="Rarity of the Pokémon card"
              width={14}
              height={14}
            />
          ))}
        </div>
        <div className="h-full w-10 relative">
          <Image
            src={packIcons as string}
            alt={pack}
            fill
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
}
