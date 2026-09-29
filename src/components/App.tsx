import type { Category, Results } from "../types/types";
import { useState } from "react";
import Wheel from "./Wheel";

const categories: Category[] = [
  {
    id: 1,
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
    id: 2,
    name: "Hair Color",
    items: [
      { name: "Black" },
      { name: "Brown" },
      { name: "Blonde" },
      { name: "Red" },
    ],
  },
  {
    id: 3,
    name: "Eye Color",
    items: [],
  },
  {
    id: 4,
    name: "Horns",
    items: [{ name: "None", winChance: 0.3 }],
  },
  {
    id: 5,
    name: "Wings",
    items: [{ name: "None", winChance: 0.3 }],
  },
  {
    id: 6,
    name: "Tail",
    items: [{ name: "None", winChance: 0.3 }],
  },
  {
    id: 7,
    name: "Accessory",
    items: [{ name: "None", winChance: 0.3 }],
  },
  {
    id: 8,
    name: "Familiar",
    items: [{ name: "None", winChance: 0.3 }],
  },
  {
    id: 9,
    name: "Class",
    items: [],
  },
  {
    id: 10,
    name: "Archetype",
    items: [],
  },
];

function App() {
  return (
    <>
      <Wheel items={categories[0].items} />
    </>
  );
}

export default App;
