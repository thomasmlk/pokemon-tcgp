import Image from "next/image";
import allDex from "@/app/pokedex/api/fetchCards";
import { Input } from "@/components/ui/input";

const Pokedex = () => {
  const collectionSvg = "/pokedex/collection.svg";
  return (
    <div className="px-5 mt-24 lg:mt-36 flex flex-col gap-10 max-w-screen-xl mx-auto">
      <div className="bg-background relative flex overflow-hidden justify-center items-center w-full p-14 rounded-t-xl shadow-lg shadow-foreground/15">
        <h1 className="font-bold text-2xl tracking-tight z-10">Collection</h1>
        <div className="absolute w-full h-full md:bottom-5">
          <Image src={collectionSvg} alt="" objectFit="cover" fill />
        </div>
        <div className="absolute bottom-0 h-1 bg-gradient-to-r from-orange-400 via-fuchsia-400 to-sky-400 w-full"></div>
      </div>
      <Input placeholder="Search for a Pokémon..."></Input>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mt-10">
        {allDex.map((dex, i) => {
          return (
            <div key={i}>
              <div className="w-full h-full md:bottom-5 aspect-[7.2/10] relative">
                <Image
                  src={dex.image}
                  alt={dex.name}
                  objectFit="cover"
                  fill
                  className="absolute"
                  quality={100}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pokedex;
