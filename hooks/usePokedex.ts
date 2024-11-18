import { useState, useEffect } from "react";

export function usePokedex() {
  const [caughtPokemons, setCaughtPokemons] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedPack, setSelectedPack] = useState("all");

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("caughtPokemons") || "{}"
    );
    setCaughtPokemons(storedData);
  }, []);

  const handleCatch = (id: string) => {
    const updatedCaughtPokemons = {
      ...caughtPokemons,
      [id]: !caughtPokemons[id],
    };
    setCaughtPokemons(updatedCaughtPokemons);
    localStorage.setItem(
      "caughtPokemons",
      JSON.stringify(updatedCaughtPokemons)
    );
  };

  const handleReset = () => {
    setCaughtPokemons({});
    localStorage.removeItem("caughtPokemons");
    setSelectedPack("all");
  };

  return {
    caughtPokemons,
    selectedPack,
    setSelectedPack,
    handleCatch,
    handleReset,
  };
}
