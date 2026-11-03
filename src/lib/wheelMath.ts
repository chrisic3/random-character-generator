import type { WheelItem } from "../types/types";

// Fraction of a slice to keep clear on each side of the landing spot, so the pointer
// never stops right on a dividing line (where it would be unclear which slice won).
// 0.05 = 5% of the slice's width on each side.
const MARGIN_FRACTION = 0.05;

// Take the wheel's items and return a weight for each one, in the same order.
// A bigger weight means a bigger chance of winning (see pickWinningIndex).
// Items with no winChance get a weight of 1. Items with a winChance get whatever weight
// makes them win that fraction of the time, no matter how many other items there are.
export function getItemWeights(items: WheelItem[]) {
  // there is nothing to pick from, and the formula below would be meaningless
  if (items.length === 0) {
    throw new Error(
      "getItemWeights expects an array > 0. It received an empty one.",
    );
  }

  // how many items are NOT the one we are calculating for (used in the weight formula)
  const otherItemsCount = items.length - 1;

  // then use map to return the weight for each item
  return items.map((item) => {
    if (item.winChance !== undefined) {
      // We want: weight / (weight + otherItemsCount) = winChance
      // (this item's share of the total, where every other item has a weight of 1).
      // Solving that for weight gives: otherItemsCount * winChance / (1 - winChance)
      // Example: 4 items, winChance 0.3 -> 3 * 0.3 / 0.7 = 1.2857
      //          total is 3 + 1.2857 = 4.2857, and 1.2857 / 4.2857 = 0.3
      return otherItemsCount * (item.winChance / (1 - item.winChance));
    } else {
      // items without a winChance all share the same base weight
      return 1;
    }
  });
}

// Take a list of weights and return a random index, where heavier weights are more likely.
// Think of the weights as lengths laid end to end along a number line: throw a dart at the
// line and whichever item's section it lands in is the winner.
export function pickWinningIndex(items: number[]): number {
  // Turn the weights into a running total, so each entry is where that item's section ends.
  // Example: weights [1, 1, 1, 1.2857] -> totals [1, 2, 3, 4.2857]
  const totals = items.reduce(
    (accumulator: number[], currentItem: number): number[] => {
      const length = accumulator.length;

      // first item has nothing before it to add to
      if (accumulator[length - 1] === undefined) {
        return [...accumulator, currentItem];
      } else {
        // every other item adds its weight to the previous running total
        return [...accumulator, accumulator[length - 1] + currentItem];
      }
    },
    [],
  );

  // the last running total is the sum of all the weights, so this picks a random spot on the line
  const randNumber = Math.random() * totals[totals.length - 1];

  // The winner is the first section that ends at or after the random spot.
  // Example: totals [1, 2, 3, 4.2857] and randNumber 2.3 -> first value >= 2.3 is 3 (index 2)
  const winningIndex = totals.findIndex((value) => {
    return value >= randNumber;
  });

  return winningIndex;
}

// Return how many degrees to rotate the wheel (0-360) so the winning slice ends up under
// the pointer at the top.
//   winningIndex - which slice won (slice 0 starts at the top and they go clockwise)
//   sliceCount   - how many slices the wheel has
// The landing spot is random within the slice, so the same winner doesn't always stop
// at the same place, but it always stays inside the margin.
export function getLandingPosition(
  winningIndex: number,
  sliceCount: number,
): number {
  const sliceAngle = 360 / sliceCount;
  // how many degrees to keep clear on each side of the slice
  const marginDegree = sliceAngle * MARGIN_FRACTION;
  // 0 to 1, how far across the usable part of the slice we land
  const randomFraction = Math.random();

  // Where the landing spot is, measured clockwise from the top of the wheel:
  //   winningIndex * sliceAngle                 - where the winning slice starts
  //   marginDegree                              - skip past the margin
  //   (sliceAngle - marginDegree * 2) * random  - a random spot in the usable space
  //                                               (the slice minus both margins)
  // The wheel rotates clockwise, so to bring that spot up to the pointer we have to
  // turn it the rest of the way round, which is why the whole thing is subtracted from 360.
  return (
    360 -
    (winningIndex * sliceAngle +
      marginDegree +
      (sliceAngle - marginDegree * 2) * randomFraction)
  );
}

// Add extra full spins in front of the landing position so the wheel spins for a while
// before it stops. A full turn (360) looks the same as no turn, so the wheel still ends
// on the same slice.
//   landingPosition - degrees from getLandingPosition
//   fullRotations   - how many whole turns to add
export function getTotalRotation(
  landingPosition: number,
  fullRotations: number,
): number {
  return 360 * fullRotations + landingPosition;
}
