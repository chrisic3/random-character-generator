import type { WheelItem } from "../types/types";

// take items and return list of weights
export function getItemWeights(items: WheelItem[]) {
  if (items.length === 0) {
    throw new Error(
      "getItemWeights expects an array > 0. It received an empty one.",
    );
  }

  // calculate the length - 1 count for the weight formula
  const otherItemsCount = items.length - 1;

  // then use map to return the weight for each item
  return items.map((item) => {
    if (item.winChance !== undefined) {
      return otherItemsCount * (item.winChance / (1 - item.winChance));
    } else {
      return 1;
    }
  });
}

export function pickWinningIndex(items: number[]): number {
  // create an array of weights with each item being a running total
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

  // get a random number between 0 and total weight
  const randNumber = Math.random() * totals[totals.length - 1];

  // using the random number, find the next largest item in the totals array
  const winningIndex = totals.findIndex((value) => {
    return value >= randNumber;
  });

  return winningIndex;
}

export function getLandingPosition(
  winningIndex: number,
  sliceCount: number,
): number {
  const sliceAngle = 360 / sliceCount;
  return 360 - (winningIndex * sliceAngle + sliceAngle / 2);
}
