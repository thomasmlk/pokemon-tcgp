// utils/getPackIcons.ts
export const getPackIcons = (pack: string): string | null => {
    // Dictionnaire des icônes de pack
    const packIcons: { [key: string]: string } = {
      "apex-mewtwo": "/pack/apex_mewtwo.png",
      "apex-charizard": "/pack/apex_charizard.png",
      "apex-pikachu": "/pack/apex_pikachu.png",
    };
  
    // Retourne l'icône correspondante ou `null` si le pack n'est pas trouvé
    return packIcons[pack] || null;
  };
  