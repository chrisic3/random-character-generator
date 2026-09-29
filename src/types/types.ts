export type Category = {
  id: number;
  name: string;
  items: WheelItem[];
};

export type Results = Record<string, string>;

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
  winChance?: number;
};
