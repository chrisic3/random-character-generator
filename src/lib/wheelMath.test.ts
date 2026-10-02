import { describe, it, expect, vi } from "vitest";
import { getItemWeights, pickWinningIndex } from "./wheelMath";
import type { WheelItem } from "../types/types";

describe("getItemWeights", () => {
  it("takes 4 items with 1 special weight item", () => {
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
    expect(result[0]).toBeCloseTo(1);
    expect(result[1]).toBeCloseTo(1);
    expect(result[2]).toBeCloseTo(1);
    expect(result[3]).toBeCloseTo(1.2857);
  });

  it("throws an error with an empty array", () => {
    const items: WheelItem[] = [];

    expect(() => getItemWeights(items)).toThrow();
  });
});

describe("pickWinningIndex", () => {
  it("takes in array of weights and returns winning index", () => {
    // arrange
    vi.spyOn(Math, "random").mockReturnValue(0.7);
    const totals = [1, 2, 3, 4.2857];

    // act

    // assert
  });
});
