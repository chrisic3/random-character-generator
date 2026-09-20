import type React from "react";
import { getSliceData, buildPathString } from "../lib/sliceGeometry";
import type { Slice } from "../types/types";

const WHEEL_CENTER = 250;
const WHEEL_RADIUS = 200;

function Wheel({ items }: { items: string[] }): React.JSX.Element {
  const slices: Slice[] = getSliceData(
    WHEEL_CENTER,
    WHEEL_RADIUS,
    items.length,
  );
  const paths = slices.map((slice: Slice, index: number): React.JSX.Element => {
    return (
      <path
        key={index}
        d={buildPathString(WHEEL_CENTER, WHEEL_RADIUS, slice)}
        stroke="black"
        fill="teal"
      />
    );
  });

  return (
    <div>
      <svg viewBox="0 0 500 500">
        <g>{paths}</g>
      </svg>
    </div>
  );
}

export default Wheel;
