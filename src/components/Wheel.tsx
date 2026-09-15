import { getSlicesData } from "../lib/sliceGeometry";

const WHEEL_CENTER = 250;
const WHEEL_RADIUS = 200;

function Wheel(items: string[]) {
  return (
    <div>
      <svg viewbox="0 0 500 500">
        <g>{console.log(getSlicesData(WHEEL_CENTER, WHEEL_RADIUS, items))};</g>
      </svg>
    </div>
  );
}

export default Wheel;
