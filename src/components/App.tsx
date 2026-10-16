import type { Results } from "../types/types";
import { categories } from "../data";
import { useState } from "react";
import Wheel from "./Wheel";

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
