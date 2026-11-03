import type { Slice } from "../types/types";

// Math.cos / Math.sin expect radians
function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// split the wheel into equal slices and work out where each slice's edges meet the outer circle
export function getSliceData(
  center: number,
  radius: number,
  numberOfItems: number,
): Slice[] {
  const sliceAngle = 360 / numberOfItems;

  return Array.from({ length: numberOfItems }, (_, i): Slice => {
    const startAngle = i * sliceAngle - 90; // -90 to rotate the first line to the top
    const endAngle = (i + 1) * sliceAngle - 90;

    // points on the outer circle where the slice starts and ends
    const startX = center + radius * Math.cos(degreesToRadians(startAngle));
    const startY = center + radius * Math.sin(degreesToRadians(startAngle));
    const endX = center + radius * Math.cos(degreesToRadians(endAngle));
    const endY = center + radius * Math.sin(degreesToRadians(endAngle));

    // SVG arc flag: 1 tells the arc to take the long way round (only needed for slices over 180 degrees)
    const largeArcFlag = sliceAngle <= 180 ? 0 : 1;

    return { startAngle, endAngle, startX, startY, largeArcFlag, endX, endY };
  });
}

// SVG path for one slice: move to the center, line out to the start point, arc clockwise to the end point, close back to the center
export function buildPathString(center: number, radius: number, slice: Slice) {
  return `M ${center} ${center} L ${slice.startX} ${slice.startY} A ${radius} ${radius} 0 ${slice.largeArcFlag} 1 ${slice.endX} ${slice.endY} Z`;
}

// place a label at the middle angle of the slice, `radius` away from the center
// textAngle is returned so the label can be rotated to line up with the slice
export function getLabelData(center: number, radius: number, slice: Slice) {
  const textAngle: number = (slice.startAngle + slice.endAngle) / 2;
  const textX: number = center + radius * Math.cos(degreesToRadians(textAngle));
  const textY: number = center + radius * Math.sin(degreesToRadians(textAngle));

  return { textAngle, textX, textY };
}
