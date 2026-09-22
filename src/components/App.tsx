import type { Category, Results } from "../types/types";
import { useState } from "react";
import Wheel from "./Wheel";

const categories: Category[] = [
  {
    id: 1,
    name: "Hair Color",
    items: ["Black", "Brown", "Blonde", "Red"],
  },
  {
    id: 2,
    name: "Hair Type",
    items: ["Bald", "Straight", "Wavy", "Curly", "Short", "Long"],
  },
];

function App() {
  return (
    <>
      <Wheel items={categories[1].items} />
    </>
  );
}

export default App;
