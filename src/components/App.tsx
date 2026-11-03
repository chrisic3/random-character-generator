import type { Results } from "../types/types";
import { categories } from "../data";
import { useState } from "react";
import Wheel from "./Wheel";
import ResultsList from "./ResultsList";

// steps through each category one wheel at a time and collects the results
function App() {
  const [results, setResults] = useState<Results>({});
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  // derived state for the current wheel
  const currentCategory = categories[currentCategoryIndex];
  const isLastCategory = currentCategoryIndex === categories.length - 1;
  const hasResult = results[currentCategory.name] !== undefined;

  // called by the wheel when its spin finishes
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

  // start over from the first category with no results
  const handleReset = () => {
    setCurrentCategoryIndex(0);
    setResults({});
  };

  // what the wheel's center button should do:
  // spin if this category has no result yet, otherwise go to the next category, or reset after the last one
  const modeProps = !hasResult
    ? ({ mode: "spin" } as const)
    : !isLastCategory
      ? ({ mode: "next", onClick: handleNext } as const)
      : ({ mode: "reset", onClick: handleReset } as const);

  return (
    <div className="flex flex-col gap-20 xl:gap-y-15 p-6 items-center">
      <header className="text-center">
        <h1 className="text-5xl font-bold">RANDOM CHARACTER GENERATOR</h1>
      </header>
      <main className="flex flex-col gap-6 items-center w-full max-w-5xl xl:flex-row xl:items-start">
        <section className="w-full max-w-2xl">
          {/* key forces a fresh Wheel (rotation and spin state) for each category */}
          <Wheel
            key={currentCategoryIndex}
            category={currentCategory.name}
            items={currentCategory.items}
            onResult={handleResult}
            {...modeProps}
          />
        </section>
        <section className="w-full max-w-sm">
          <ResultsList results={results} />
        </section>
      </main>
    </div>
  );
}

export default App;
