import type { WheelItem } from "../types/types";

// fraction of a slice to keep clear on each side so the pointer never lands right on a dividing line
const MARGIN_FRACTION = 0.05;

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
      // solve weight / (weight + otherItemsCount) = winChance for weight,
      // assuming every other item has a weight of 1
      return otherItemsCount * (item.winChance / (1 - item.winChance));
    } else {
      // items without a winChance all share the same base weight
      return 1;
    }
  });
}

// take a list of weights and return a random index, where heavier weights are more likely
export function pickWinningIndex(items: number[]): number {
  // create an array of weights with each item being a running total
  const totals = items.reduce(
    (accumulator: number[], currentItem: number): number[] => {
      const length = accumulator.length;

      // first item has nothing before it to add to
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

// return how many degrees to rotate the wheel so the winning slice ends up under the top pointer
// the wheel spins clockwise, so we subtract from 360 to bring the slice back up to the top
export function getLandingPosition(
  winningIndex: number,
  sliceCount: number,
): number {
  const sliceAngle = 360 / sliceCount;
  const marginDegree = sliceAngle * MARGIN_FRACTION;
  const randomFraction = Math.random();

  // start of the winning slice, plus the margin, plus a random spot within the remaining space
  return (
    360 -
    (winningIndex * sliceAngle +
      marginDegree +
      (sliceAngle - marginDegree * 2) * randomFraction)
  );
}

// add extra full spins before the landing position so the wheel spins for a while before stopping
export function getTotalRotation(
  landingPosition: number,
  fullRotations: number,
): number {
  return 360 * fullRotations + landingPosition;
}
