import type { Category, Results } from "../types/Types";
import { useState } from "react";

const categories: Category[] = [
  {
    id: 1,
    name: "Hair Color",
    items: ["Black", "Brown", "Blonde"],
  },
  {
    id: 2,
    name: "Hair Type",
    items: ["Bald", "Straight", "Wavy", "Curly", "Short", "Long"],
  },
];

function App() {
  for (let i = 0; i < categories.length; i++) {
    console.log(categories[i].items);
  }
  return <div className="bg-red-500">Hello world</div>;
}

export default App;
