import { describe, it, expect } from "vitest";
import { getSliceData, getLabelData } from "./sliceGeometry";

describe("getSliceData", () => {
  it("4 items return 4 slices", () => {
    // arrange
    const center = 250;
    const radius = 200;
    const length = 4;

    // act
    const result = getSliceData(center, radius, length);

    // assert
    expect(result).toHaveLength(4);
  });

  it("sets largeArcFlag correctly for angles UNDER or EQUAL TO 180 degrees", () => {
    // arrange
    const center = 250;
    const radius = 200;
    const length = 7;

    // act
    const result = getSliceData(center, radius, length);

    // assert
    result.forEach((slice) => {
      expect(slice.largeArcFlag).toBe(0);
    });
  });

  it("angles cover the full 360 degrees with no gaps", () => {
    // arrange
    const center = 250;
    const radius = 200;
    const length = 3;

    // act
    const result = getSliceData(center, radius, length);

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
    const length = 4;

    // act
    const result = getSliceData(center, radius, length);

    // assert
    expect(result[0].startX).toBe(250);
    expect(result[0].startY).toBe(50);
  });
});

describe("getLabelData", () => {
  it("computes correct coordinates for known inputs", () => {
    // arrange
    const center = 250;
    const radius = (40 + 200) / 2;
    const slice = {
      startAngle: 0,
      endAngle: 90,
      startX: 0,
      startY: 0,
      largeArcFlag: 0,
      endX: 0,
      endY: 0,
    };

    // act
    const result = getLabelData(center, radius, slice);

    // assert
    expect(result.x).toBeCloseTo(334.8528);
    expect(result.y).toBeCloseTo(334.8528);
  });
});
