import type { Results } from "../types/types";
import { categories } from "../data";
import { useState } from "react";
import Wheel from "./Wheel";
import ResultsList from "./ResultsList";

function App() {
  const [results, setResults] = useState<Results>({});
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const currentCategory = categories[currentCategoryIndex];
  const isLastCategory = currentCategoryIndex === categories.length - 1;
  const hasResult = results[currentCategory.name] !== undefined;
  const mode = !hasResult
    ? "spin"
    : hasResult && !isLastCategory
      ? "next"
      : "reset";

  const handleResult = (winningName: string) => {
    setResults((prev) => {
      return {
        ...prev,
        [currentCategory.name]: winningName,
      };
    });
  };

  const onClick = () => {
    if (mode === "next") {
      setCurrentCategoryIndex((prev) => prev + 1);
    } else if (mode === "reset") {
      setCurrentCategoryIndex(0);
      setResults({});
    }
  };

  // const handleNext = () => {
  //   setCurrentCategoryIndex((prev) => prev + 1);
  // };

  // const handleReset = () => {
  //   setCurrentCategoryIndex(0);
  //   setResults({});
  // };

  return (
    <>
      <h1>RANDOM CHARACTER GENERATOR</h1>
      <h2>{currentCategory.name}</h2>
      <Wheel
        key={currentCategoryIndex}
        items={currentCategory.items}
        mode={mode}
        onResult={handleResult}
        onClick={onClick}
      />
      {/* {hasResult && !isLastCategory && (
        <button onClick={handleNext}>Next</button>
      )}
      {hasResult && isLastCategory && (
        <button onClick={handleReset}>Reset</button>
      )} */}
      <ResultsList results={results} />
    </>
  );
}

export default App;
