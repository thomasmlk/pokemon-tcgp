import Image from "next/image";
import {
  MewtwoSvg,
  CharizardSvg,
  PikachuSvg,
} from "@/utils/rectangleSvgSelector";

export default function Home() {
  return (
    <div className="flex flex-col gap-14 px-5 my-36 md:my-0 md:h-svh justify-center max-w-screen-xl mx-auto">
      <div className="flex flex-col gap-10 md:gap-5">
        <div className="flex flex-col md:flex-row gap-3 md:items-end">
          <h1 className="font-bold text-3xl md:text-5xl">Pokémon TCGP App</h1>
          <p className="font-medium text-sm">by The Indigo League</p>
        </div>
        <div className="flex gap-5">
          <a className="font-semibold" href="#">
            Packs
          </a>
          <a className="font-semibold" href="#">
            Events
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-10 md:gap-5 w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="relative overflow-hidden aspect-[7/4] w-full bg-background shadow-xl shadow-foreground/10 rounded-2xl">
            <Image
              src="/assets/pack_mewtwo.png"
              alt="Genetic Apex Mewtwo pack"
              fill
              objectFit="contain"
              className="z-10"
            />
            <div className="absolute w-full h-full">
              <MewtwoSvg />
            </div>
          </div>
          <span className="font-medium">
            <span className="font-bold">Apex Mewtwo</span> from Genetic Apex
          </span>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="relative overflow-hidden aspect-[7/4] w-full bg-background shadow-xl shadow-foreground/10 rounded-2xl">
            <Image
              src="/assets/pack_charizard.png"
              alt="Genetic Apex Charizard pack"
              fill
              objectFit="contain"
              className="z-10"
            />
            <div className="absolute w-full h-full">
              <CharizardSvg />
            </div>
          </div>
          <span className="font-medium">
            <span className="font-bold">Apex Charizard</span> from Genetic Apex
          </span>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="relative overflow-hidden aspect-[7/4] w-full bg-background shadow-xl shadow-foreground/10 rounded-2xl">
            <Image
              src="/assets/pack_pikachu.png"
              alt="Genetic Apex Pikachu pack"
              fill
              objectFit="contain"
              className="z-10"
            />
            <div className="absolute w-full h-full">
              <PikachuSvg />
            </div>
          </div>
          <span className="font-medium">
            <span className="font-bold">Apex Pikachu</span> from Genetic Apex
          </span>
        </div>
      </div>
    </div>
  );
}
