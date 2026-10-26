import type React from "react";
import type { Results } from "../types/types";

function ResultsList({ results }: { results: Results }): React.JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl text-center">RESULTS</h2>
      <ul className="max-w-xs">
        {Object.entries(results).map((pair) => {
          const [key, val] = pair;
          return (
            <li key={key}>
              {key}: {val}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ResultsList;
