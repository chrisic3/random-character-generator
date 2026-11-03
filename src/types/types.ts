// one wheel's worth of options, e.g. "Hair Color"
export type Category = {
  name: string;
  items: WheelItem[];
};

// category name -> winning item name
export type Results = Record<string, string>;

// angles (degrees) and outer-edge points for one wedge of the wheel, see getSliceData
export type Slice = {
  startAngle: number;
  endAngle: number;
  startX: number;
  startY: number;
  largeArcFlag: number;
  endX: number;
  endY: number;
};

export type WheelItem = {
  name: string;
  winChance?: number; // optional fixed probability (0-1); items without one split the rest evenly
};

// before a result: the center button spins the wheel
type SpinWheelProps = {
  category: string;
  items: WheelItem[];
  onResult: (winner: string) => void;
  mode: "spin";
};

// after a result: the center button goes to the next category, or resets after the last one
type AdvanceWheelProps = {
  category: string;
  items: WheelItem[];
  onResult: (winner: string) => void;
  mode: "next" | "reset";
  onClick: () => void;
};

// discriminated union on `mode` so onClick is only required when the button isn't spinning
export type WheelProps =SpinWheelProps | AdvanceWheelProps;
