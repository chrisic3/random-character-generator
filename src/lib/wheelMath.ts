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

// create an array of weights with each item being a running total
// get a random number between 0 and total weight
// using the random number, find the next largest item in the totals array
export function pickWinningIndex(items: number[]): number {
  const totals = items.reduce(
    (accumulator: number[], currentItem: number): number[] => {
      const length = accumulator.length;

      if (accumulator[length - 1] === undefined) {
        return [...accumulator, currentItem];
      } else {
        return [...accumulator, accumulator[length - 1] + currentItem];
      }
    },
    [],
  );

  const randNumber = Math.random() * totals[totals.length - 1];

  const winningIndex = totals.findIndex((value) => {
    return value >= randNumber;
  });

  return winningIndex;
}
