import type { Category, Results } from "../types/types";
import { useState } from "react";
import Wheel from "./Wheel";

const categories: Category[] = [
  {
    id: 1,
    name: "Hair Type",
    items: ["Straight", "Wavy", "Curly", "Short", "Long", "None"],
  },
  {
    id: 2,
    name: "Hair Color",
    items: ["Black", "Brown", "Blonde", "Red"],
  },
  {
    id: 3,
    name: "Eye Color",
    items: ["None"],
  },
  {
    id: 4,
    name: "Horns",
    items: ["None"],
  },
  {
    id: 5,
    name: "Wings",
    items: ["None"],
  },
  {
    id: 6,
    name: "Tail",
    items: ["None"],
  },
  {
    id: 7,
    name: "Accessory",
    items: ["None"],
  },
  {
    id: 8,
    name: "Familiar",
    items: ["None"],
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
