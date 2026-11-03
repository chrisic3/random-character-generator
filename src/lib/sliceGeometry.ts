import type { Slice } from "../types/types";

// Math.cos / Math.sin expect radians, but the rest of this file thinks in degrees
// because they are easier to read (90 = quarter turn, 360 = full circle)
function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// Split the wheel into equal slices and work out where each slice's edges meet the outer circle.
//   center        - x and y of the wheel's center (the wheel is square, so one number covers both)
//   radius        - distance from the center to the outer edge
//   numberOfItems - how many slices to make
// Returns one Slice per item, in order, going clockwise from the top.
export function getSliceData(
  center: number,
  radius: number,
  numberOfItems: number,
): Slice[] {
  // every slice gets the same share of the 360 degree circle
  const sliceAngle = 360 / numberOfItems;

  return Array.from({ length: numberOfItems }, (_, i): Slice => {
    // 0 degrees points right in SVG, so -90 rotates the first slice's start line to the top
    const startAngle = i * sliceAngle - 90;
    // a slice ends exactly where the next one starts, so there are no gaps or overlaps
    const endAngle = (i + 1) * sliceAngle - 90;

    // Convert each angle to a point on the outer circle:
    //   x = center + radius * cos(angle)
    //   y = center + radius * sin(angle)
    // SVG's y axis points DOWN, so increasing angles move clockwise on screen
    const startX = center + radius * Math.cos(degreesToRadians(startAngle));
    const startY = center + radius * Math.sin(degreesToRadians(startAngle));
    const endX = center + radius * Math.cos(degreesToRadians(endAngle));
    const endY = center + radius * Math.sin(degreesToRadians(endAngle));

    // SVG arc flag: an arc between two points could go the short way or the long way round.
    // 1 picks the long way, which is only needed for slices bigger than half the circle
    const largeArcFlag = sliceAngle <= 180 ? 0 : 1;

    return { startAngle, endAngle, startX, startY, largeArcFlag, endX, endY };
  });
}

// Build the SVG path string that draws one slice (a pie wedge).
// The commands, in order:
//   M cx cy                  - move to the center without drawing
//   L startX startY          - draw a straight line out to where the slice starts
//   A r r 0 flag 1 endX endY - draw an arc of the circle to where the slice ends
//                              (r r = x/y radius, 0 = no ellipse rotation,
//                               flag = large arc flag, 1 = sweep clockwise)
//   Z                        - close the shape by drawing back to the center
export function buildPathString(center: number, radius: number, slice: Slice) {
  return `M ${center} ${center} L ${slice.startX} ${slice.startY} A ${radius} ${radius} 0 ${slice.largeArcFlag} 1 ${slice.endX} ${slice.endY} Z`;
}

// Work out where a slice's label should sit.
// The label goes at the slice's middle angle, `radius` away from the center.
// A smaller radius than the wheel's means the text sits inside the slice, not on its edge.
// textAngle is returned as well so the caller can rotate the text to follow the slice.
export function getLabelData(center: number, radius: number, slice: Slice) {
  // halfway between where the slice starts and ends
  const textAngle: number = (slice.startAngle + slice.endAngle) / 2;
  // same circle math as getSliceData, just at the middle angle
  const textX: number = center + radius * Math.cos(degreesToRadians(textAngle));
  const textY: number = center + radius * Math.sin(degreesToRadians(textAngle));

  return { textAngle, textX, textY };
}
