import type React from "react";
import type { Results } from "../types/types";

function ResultsList({ results }: { results: Results }): React.JSX.Element {
  return (
    <div className="flex flex-col items-center outline">
      <h2 className="text-3xl font-bold">RESULTS</h2>
      <ul className="max-w-sm outline">
        {Object.entries(results).map((pair) => {
          const [key, val] = pair;
          return (
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
