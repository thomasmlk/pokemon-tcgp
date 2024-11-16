// utils/getPackIcons.ts
export const getPackIcons = (pack: string): string | null => {
    // Dictionnaire des icônes de pack
    const packIcons: { [key: string]: string } = {
      "genetic-apex": "/pack/apex_mewtwo.png",
      "flame-apex": "/pack/apex_charizard.png",
      "electric-apex": "/pack/apex_pikachu.png",
    };
  
    // Retourne l'icône correspondante ou `null` si le pack n'est pas trouvé
    return packIcons[pack] || null;
  };
  