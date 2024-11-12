"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const Pokedex = () => {
  const collectionSvg = "/pokedex/collection.svg";
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // Fonction pour récupérer les URLs des images
  const fetchImageUrls = async (maxImages: number) => {
    const baseUrl = "https://www.serebii.net/tcgpocket/geneticapex/";
    const urls: string[] = [];

    for (let i = 1; i <= maxImages; i++) {
      const imageUrl = `${baseUrl}${i}.jpg`;
      urls.push(imageUrl);
    }

    setImageUrls(urls); // Mettre à jour l'état avec les URLs
  };

  useEffect(() => {
    fetchImageUrls(286); // Ajuste ce nombre selon le nombre d'images
  }, []); // Le tableau vide fait en sorte que l'effet s'exécute seulement au montage du composant

  return (
    <div className="px-5 mt-36 flex flex-col gap-10 max-w-screen-xl mx-auto">
      <div className="bg-background relative flex overflow-hidden justify-center items-center w-full p-14 rounded-t-xl shadow-lg shadow-foreground/15">
        <h1 className="font-bold text-2xl tracking-tight z-10">Collection</h1>
        <div className="absolute w-full h-full md:bottom-5">
          <Image src={collectionSvg} alt="" objectFit="cover" fill />
        </div>
        <div className="absolute bottom-0 h-1 bg-gradient-to-r from-orange-400 via-fuchsia-400 to-sky-400 w-full"></div>
      </div>

      <Input placeholder="Search for a Pokémon..."></Input>

      {imageUrls.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mt-10">
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className="relative flex justify-center aspect-[7.2/10] items-center"
            >
              <Image
                src={url}
                alt={`Image ${index + 1}`}
                objectFit="cover"
                fill
                className="rounded-lg shadow-lg absolute"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          No Pokémon found.
        </p>
      )}
    </div>
  );
};

export default Pokedex;
