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

  const handleResult = (winningName: string) => {
    setResults((prev) => {
      return {
        ...prev,
        [currentCategory.name]: winningName,
      };
    });
  };

  const handleNext = () => {
    setCurrentCategoryIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentCategoryIndex(0);
    setResults({});
  };

  const modeProps = !hasResult
    ? ({ mode: "spin" } as const)
    : !isLastCategory
      ? ({ mode: "next", onClick: handleNext } as const)
      : ({ mode: "reset", onClick: handleReset } as const);

  return (
    <div className="flex flex-col gap-6 p-6 items-center">
      <header className="text-center outline">
        <h1 className="text-3xl font-bold">RANDOM CHARACTER GENERATOR</h1>
        <h2 className="text-2xl">{currentCategory.name}</h2>
      </header>
      <main className="w-full outline">
        <Wheel
          key={currentCategoryIndex}
          items={currentCategory.items}
          onResult={handleResult}
          {...modeProps}
        />
        <ResultsList results={results} />
      </main>
    </div>
  );
}

export default App;
