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
    <div className="flex flex-col gap-6 xl:gap-y-15 p-6 items-center">
      <header className="text-center">
        <h1 className="text-3xl font-bold">RANDOM CHARACTER GENERATOR</h1>
      </header>
      <main className="flex flex-col gap-6 items-center w-full max-w-5xl xl:flex-row xl:items-start">
        <section className="w-full max-w-2xl">
          <Wheel
            key={currentCategoryIndex}
            category={currentCategory.name}
            items={currentCategory.items}
            onResult={handleResult}
            {...modeProps}
          />
        </section>
        <section className="w-full max-w-xs">
          <ResultsList results={results} />
        </section>
      </main>
    </div>
  );
}

export default App;
