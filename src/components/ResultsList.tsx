import type React from "react";
import type { Results } from "../types/types";

// Shows each category and the item it landed on, in the order they were spun.
// Object keys keep the order they were added in, so the list grows downward as the user goes.
// It only displays data: App owns the results, this just receives them as a prop.
function ResultsList({ results }: { results: Results }): React.JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold">RESULTS</h2>
      <ul className="max-w-sm">
        {/* Turn the results object into [category, winner] pairs and render one list item per pair */}
        {Object.entries(results).map((pair) => {
          // split the pair, e.g. ["Hair Color", "Red"] -> key = "Hair Color", val = "Red"
          const [key, val] = pair;
          return (
            // the category name is unique, so it works as React's list key
            <li key={key} className="text-2xl">
              {key}: {val}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ResultsList;
