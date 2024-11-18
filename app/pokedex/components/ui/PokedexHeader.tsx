import Image from "next/image";

export function PokedexHeader() {
  const collectionSvg = "/pokedex/collection.svg";

  return (
    <div className="bg-background relative flex overflow-hidden justify-center items-center w-full p-14 rounded-t-xl shadow-lg shadow-foreground/15">
      <h1 className="font-bold text-2xl tracking-tight z-10">Collection</h1>
      <div className="absolute w-full h-full md:bottom-5">
        <Image src={collectionSvg} alt="" objectFit="cover" fill />
      </div>
      <div className="absolute bottom-0 h-1 bg-gradient-to-r from-orange-400 via-fuchsia-400 to-sky-400 w-full"></div>
    </div>
  );
}
