import { describe, it, expect } from "vitest";
import { getSliceData } from "./sliceGeometry";

describe("getSliceData", () => {
  it("4 items return 4 slices", () => {
    // arrange
    const center = 250;
    const radius = 200;
    const items = ["A", "B", "C", "D"];

    // act
    const result = getSliceData(center, radius, items);

    // assert
    expect(result).toHaveLength(4);
  });

  it("sets largeArcFlag correctly for angles UNDER or EQUAL TO 180 degrees", () => {
    // arrange
    const center = 250;
    const radius = 200;
    const items = ["A", "B", "C", "D"];

    // act
    const result = getSliceData(center, radius, items);

    // assert
    result.forEach((slice) => {
      expect(slice.largeArcFlag <= 180 ? 0 : 1).toBe(0);
    });
  });

  it("sets largeArcFlag correctly for angles OVER 180 degrees", () => {
    // arrange
    const center = 250;
    const radius = 200;
    const items = ["A"];

    // act
    const result = getSliceData(center, radius, items);

    // assert
    result.forEach((slice) => {
      expect(slice.largeArcFlag > 180 ? 1 : 0).toBe(1);
    });
  });
});
