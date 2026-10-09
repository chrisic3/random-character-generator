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
  return (
    <>
      <Wheel items={categories[0].items} onResult={console.log} />
    </>
  );
}

export default App;
