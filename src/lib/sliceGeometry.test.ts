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
    const items = ["A", "B", "C", "D", "E", "F", "G"];

    // act
    const result = getSliceData(center, radius, items);

    // assert
    result.forEach((slice) => {
      expect(slice.largeArcFlag).toBe(0);
    });
  });

  it("angles cover the full 360 degrees with no gaps", () => {
    // arrange
    const center = 250;
    const radius = 200;
    const items = ["A", "B", "C"];

    // act
    const result = getSliceData(center, radius, items);

    // assert
    for (let i = 0; i < result.length - 1; i++) {
      // result.length - 1 so we can compare to the last index without overflowing
      expect(result[i].endAngle === result[i + 1].startAngle).toBe(true);
    }
    expect(
      result[result.length - 1].endAngle === result[0].startAngle + 360,
    ).toBe(true);
  });

  it("computes correct coordinates for a known 4-item wheel", () => {
    // arrange
    const center = 250;
    const radius = 200;
    const items = ["A", "B", "C", "D"];

    // act
    const result = getSliceData(center, radius, items);

    // assert
    expect(result[0].startX).toBe(250);
    expect(result[0].startY).toBe(50);
  });
});
