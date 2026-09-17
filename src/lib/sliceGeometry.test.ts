import { describe, it, expect } from "vitest";
import { getSliceData } from "./sliceGeometry";

describe("getSliceData", () => {
  it("4 items return 4 slices", () => {
    // arrange
    const items = ["A", "B", "C", "D"];

    // act
    const result = getSliceData(0, 0, items);

    // assert
    expect(result).toHaveLength(4);
  });
});
