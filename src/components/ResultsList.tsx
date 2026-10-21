import type React from "react";
import type { Results } from "../types/types";

function ResultsList({ results }: { results: Results }): React.JSX.Element {
  return (
    <ul>
      {Object.entries(results).map((pair) => {
        const [key, val] = pair;
        return (
          <li key={key}>
            {key}: {val}
          </li>
        );
      })}
    </ul>
  );
}

export default ResultsList;
