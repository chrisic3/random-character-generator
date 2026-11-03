// One wheel's worth of options, e.g. "Hair Color" with all of its possible colors.
// Each category in data.ts becomes one spin of the wheel.
export type Category = {
  name: string; // shown as the wheel's heading and used as the key in Results
  items: WheelItem[]; // one slice on the wheel per item
};

// The winners so far, keyed by category name, e.g. { "Hair Color": "Red" }.
// A category that hasn't been spun yet has no entry.
export type Results = Record<string, string>;

// The geometry for one wedge of the wheel, calculated by getSliceData.
export type Slice = {
  startAngle: number; // degrees, where the slice begins (0 = right, -90 = top)
  endAngle: number; // degrees, where the slice ends
  startX: number; // point on the outer circle at startAngle
  startY: number;
  largeArcFlag: number; // SVG arc flag: 1 if the slice is over 180 degrees, otherwise 0
  endX: number; // point on the outer circle at endAngle
  endY: number;
};

// One option on a wheel, e.g. "Red" or "Wings: None".
export type WheelItem = {
  name: string; // text shown on the slice and saved to Results when it wins
  // Optional fixed chance of winning, from 0 to 1 (0.3 = 30%).
  // Items without one all share the remaining chance equally, see getItemWeights.
  winChance?: number;
};

// Props for a wheel that hasn't been spun yet: the center button spins it.
type SpinWheelProps = {
  category: string; // name of the category being spun
  items: WheelItem[]; // the slices to draw
  onResult: (winner: string) => void; // called with the winner's name once the spin stops
  mode: "spin";
};

// Props for a wheel that already has a result: the center button moves on instead.
// "next" goes to the next category, "reset" starts over after the last category.
type AdvanceWheelProps = {
  category: string;
  items: WheelItem[];
  onResult: (winner: string) => void;
  mode: "next" | "reset";
  onClick: () => void; // what the center button does in these modes
};

// A discriminated union: TypeScript looks at `mode` to know which props are available.
// This means onClick is required for "next" and "reset" but doesn't exist for "spin",
// so a wheel can't be given a click handler it would never use (or forget one it needs).
export type WheelProps = SpinWheelProps | AdvanceWheelProps;
