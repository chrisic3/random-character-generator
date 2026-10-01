import type { WheelItem } from "../types/types";

// take items and return list of weights
// calculate the length - 1 count for the weight formula
// then use map to return the weight for each item
export function getItemWeights(items: WheelItem[]) {
  const otherItemsCount = items.length - 1;

  return items.map((item) => {
    if (item.winChance !== undefined) {
      return otherItemsCount * (item.winChance / (1 - item.winChance));
    } else {
      return 1;
    }
  });
}
