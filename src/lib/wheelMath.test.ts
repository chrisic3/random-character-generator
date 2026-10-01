import { describe, it, expect } from "vitest";
import { getItemWeights } from "./wheelMath";
import type { WheelItem } from "../types/types";

describe("getItemWeights", () => {
  it("4 items with 1 special weight item", () => {
    // arrange
    const items: WheelItem[] = [
      { name: "normal1" },
      { name: "normal2" },
      { name: "normal3" },
      { name: "special", winChance: 0.3 },
    ];
    // act
    const result = getItemWeights(items);

    // assert
    expect(result).toStrictEqual([1, 1, 1, 1.2857142857142858]);
  });
});
