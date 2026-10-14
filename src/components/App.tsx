import type { Category, Results } from "../types/types";
import { useState } from "react";
import Wheel from "./Wheel";

const categories: Category[] = [
  {
    name: "Hair Type",
    items: [
      { name: "Straight" },
      { name: "Wavy" },
      { name: "Curly" },
      { name: "Short" },
      { name: "Long" },
      { name: "Bald", winChance: 0.3 },
    ],
  },
  {
    name: "Hair Color",
    items: [
      { name: "Black" },
      { name: "Brown" },
      { name: "Blonde" },
      { name: "Red" },
    ],
  },
  {
    name: "Eye Color",
    items: [],
  },
  {
    name: "Horns",
    items: [{ name: "None", winChance: 0.3 }],
  },
  {
    name: "Wings",
    items: [{ name: "None", winChance: 0.3 }],
  },
  {
    name: "Tail",
    items: [{ name: "None", winChance: 0.3 }],
  },
  {
    name: "Accessory",
    items: [{ name: "None", winChance: 0.3 }],
  },
  {
    name: "Familiar",
    items: [{ name: "None", winChance: 0.3 }],
  },
  {
    name: "Class",
    items: [],
  },
  {
    name: "Archetype",
    items: [],
  },
];

function App() {
  const [results, setResults] = useState({});
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const handleResult = (winningName: string) => {
    setResults((prev) => {
      return {
        ...prev,
        [categories[currentCategoryIndex].name]: winningName,
      };
    });
  };

  const handleClick = () => {
    if (currentCategoryIndex != categories.length - 1) {
      setCurrentCategoryIndex(
        (currentCategoryIndex) => (currentCategoryIndex += 1),
      );
    }
  };

  return (
    <>
      <h1>RANDOM CHARACTER GENERATOR</h1>
      <h2>{categories[currentCategoryIndex].name}</h2>
      <Wheel
        key={currentCategoryIndex}
        items={categories[currentCategoryIndex].items}
        onResult={handleResult}
      />
      <button onClick={handleClick}>Next</button>
    </>
  );
}

export default App;
