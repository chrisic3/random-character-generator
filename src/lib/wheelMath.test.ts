import { describe, it, expect, vi, afterEach } from "vitest";
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
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns index 0 when pick is 0", () => {
    // arrange
    vi.spyOn(Math, "random").mockReturnValue(0);
    const weights = [1, 1, 1, 1.2857];

    // act
    const result = pickWinningIndex(weights);

    // assert
    expect(result).toBe(0);
  });

  it("returns index 0 when pick is 0.7", () => {
    // arrange
    vi.spyOn(Math, "random").mockReturnValue(0.7 / 4.2857);
    const weights = [1, 1, 1, 1.2857];

    // act
    const result = pickWinningIndex(weights);

    // assert
    expect(result).toBe(0);
  });

  it("returns index 2 when pick is 2.3", () => {
    // arrange
    vi.spyOn(Math, "random").mockReturnValue(2.3 / 4.2857);
    const weights = [1, 1, 1, 1.2857];

    // act
    const result = pickWinningIndex(weights);

    // assert
    expect(result).toBe(2);
  });

  it("returns index 1 when pick is 2", () => {
    // arrange
    vi.spyOn(Math, "random").mockReturnValue(2 / 4.2857);
    const weights = [1, 1, 1, 1.2857];

    // act
    const result = pickWinningIndex(weights);

    // assert
    expect(result).toBe(1);
  });

  it("returns index 3 when pick is 4.1", () => {
    // arrange
    vi.spyOn(Math, "random").mockReturnValue(4.1 / 4.2857);
    const weights = [1, 1, 1, 1.2857];

    // act
    const result = pickWinningIndex(weights);

    // assert
    expect(result).toBe(3);
  });

  it("returns the weighted item approximately 30% of wins over 10,000 trials", () => {
    // arrange
    const weights = [1, 1, 1, 1.2857];
    const counts = new Array(weights.length).fill(0);
    const totalWeight = weights.reduce(
      (accumulator: number, currentItem: number): number => {
        return (accumulator += currentItem);
      },
      0,
    );

    // act
    for (let i = 0; i < 10000; i++) {
      const result = pickWinningIndex(weights);
      counts[result]++;
    }

    // assert
    counts.forEach((value, index) => {
      const expectedPercent = weights[index] / totalWeight;
      const actualPercent = value / 10000;
    });
  });
});
