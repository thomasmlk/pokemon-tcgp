// utils/getRarityIcons.ts
export const getRarityIcons = (rarity: string): string[] => {
  const rarityIcons: string[] = [
    "/rarity/rarity_01.png", // pour rarity 1
    "/rarity/rarity_01.png", // pour rarity 2
    "/rarity/rarity_01.png", // pour rarity 3
    "/rarity/rarity_01.png", // pour rarity 4
    "/rarity/rarity_02.png", // pour rarity 5
    "/rarity/rarity_02.png", // pour rarity 6
    "/rarity/rarity_02.png", // pour rarity 7
    "/rarity/rarity_03.png", // pour rarity 8
  ];

  // Parse la rareté en entier, et si ce n'est pas un nombre valide, utilise 1 par défaut
  const rarityValue = parseInt(rarity, 7) || 1;

  // Limite la valeur à un minimum de 1 et un maximum correspondant à la longueur du tableau
  const safeRarity = Math.min(Math.max(rarityValue, 1), rarityIcons.length);

  // Renvoie un tableau contenant des icônes correspondant au nombre de rareté
  return Array(safeRarity).fill(rarityIcons[safeRarity - 1]);
};
