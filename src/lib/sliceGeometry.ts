import type { Slice } from "../types/types";

function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function getSliceData(
  center: number,
  radius: number,
  numberOfItems: number,
): Slice[] {
  const sliceAngle = 360 / numberOfItems;

  return Array.from(
    { length: numberOfItems },
    (_: string, i: number): Slice => {
      const startAngle = i * sliceAngle - 90; // -90 to rotate the first line to the top
      const endAngle = (i + 1) * sliceAngle - 90;

      const startX = center + radius * Math.cos(degreesToRadians(startAngle));
      const startY = center + radius * Math.sin(degreesToRadians(startAngle));
      const endX = center + radius * Math.cos(degreesToRadians(endAngle));
      const endY = center + radius * Math.sin(degreesToRadians(endAngle));

      const largeArcFlag = sliceAngle <= 180 ? 0 : 1;

      return { startAngle, endAngle, startX, startY, largeArcFlag, endX, endY };
    },
  );
}

export function buildPathString(center: number, radius: number, slice: Slice) {
  return `M ${center} ${center} L ${slice.startX} ${slice.startY} A ${radius} ${radius} 0 ${slice.largeArcFlag} 1 ${slice.endX} ${slice.endY} Z`;
}

export function getLabelData(center: number, radius: number, slice: Slice) {
  const angle: number = (slice.startAngle + slice.endAngle) / 2;
  const x: number = center + radius * Math.cos(degreesToRadians(angle));
  const y: number = center + radius * Math.sin(degreesToRadians(angle));

  return { x, y };
}
