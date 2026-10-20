import type { Results } from "../types/types";
import { categories } from "../data";
import { useState } from "react";
import Wheel from "./Wheel";

function App() {
  const [results, setResults] = useState<Results>({});
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const currentCategory = categories[currentCategoryIndex];
  const isLastCategory = currentCategoryIndex === categories.length - 1;
  const hasResult = results[currentCategory.name] !== undefined;

  const handleResult = (winningName: string) => {
    setResults((prev) => {
      return {
        ...prev,
        [currentCategory.name]: winningName,
      };
    });
  };

  const handleNext = () => {
    if (!isLastCategory) {
      setCurrentCategoryIndex(
        (currentCategoryIndex) => (currentCategoryIndex += 1),
      );
    }
  };

  const handleReset = () => {};

  return (
    <>
      <h1>RANDOM CHARACTER GENERATOR</h1>
      <h2>{currentCategory.name}</h2>
      <Wheel
        key={currentCategoryIndex}
        items={currentCategory.items}
        onResult={handleResult}
      />
      {hasResult && !isLastCategory && (
        <button onClick={handleNext}>Next</button>
      )}
      {hasResult && isLastCategory && (
        <button onClick={handleReset}>Reset</button>
      )}
    </>
  );
}

export default App;
