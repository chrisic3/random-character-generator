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
