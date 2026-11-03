import type { Results } from "../types/types";
import { categories } from "../data";
import { useState } from "react";
import Wheel from "./Wheel";
import ResultsList from "./ResultsList";

// The top-level component. It steps through the categories one wheel at a time and
// collects the winners. It owns all of the state; Wheel and ResultsList just receive props.
function App() {
  // winners so far, keyed by category name
  const [results, setResults] = useState<Results>({});
  // which category is on screen (an index into the categories array in data.ts)
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  // Values worked out from the state above. They are recalculated on every render
  // instead of being stored, so they can never get out of sync with the state.
  const currentCategory = categories[currentCategoryIndex];
  const isLastCategory = currentCategoryIndex === categories.length - 1;
  // true once the current category has been spun
  const hasResult = results[currentCategory.name] !== undefined;

  // Called by the wheel when its spin finishes.
  // The functional form of setResults (prev => ...) builds on the latest results instead of
  // a possibly stale copy, and the spread keeps the earlier winners while adding this one.
  const handleResult = (winningName: string) => {
    setResults((prev) => {
      return {
        ...prev,
        [currentCategory.name]: winningName,
      };
    });
  };

  // move on to the next category's wheel (only offered when it isn't the last one)
  const handleNext = () => {
    setCurrentCategoryIndex((prev) => prev + 1);
  };

  // start over from the first category with no results
  const handleReset = () => {
    setCurrentCategoryIndex(0);
    setResults({});
  };

  // What the wheel's center button should do, as a set of props to spread onto <Wheel>:
  //   no result yet          -> "spin" (needs no click handler, the wheel handles it)
  //   result, more to go     -> "next" and move to the next category
  //   result, last category  -> "reset" and start over
  // `as const` keeps each mode as its exact string ("spin", not just string), which is what
  // lets TypeScript match these objects to the WheelProps union.
  const modeProps = !hasResult
    ? ({ mode: "spin" } as const)
    : !isLastCategory
      ? ({ mode: "next", onClick: handleNext } as const)
      : ({ mode: "reset", onClick: handleReset } as const);

  return (
    // Outer page layout: a centered column with the title on top and the content below
    <div className="flex flex-col gap-20 xl:gap-y-15 p-6 items-center">
      <header className="text-center">
        <h1 className="text-5xl font-bold">RANDOM CHARACTER GENERATOR</h1>
      </header>
      {/* Wheel and results are stacked on small screens, and side by side from the
          xl breakpoint up (xl:flex-row) */}
      <main className="flex flex-col gap-6 items-center w-full max-w-5xl xl:flex-row xl:items-start">
        <section className="w-full max-w-2xl">
          {/* A new key makes React throw away the old Wheel and mount a new one, so each
              category starts with an unrotated wheel and a fresh "spin started" flag.
              {...modeProps} adds mode (and onClick when needed). */}
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
