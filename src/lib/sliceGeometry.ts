function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function getSlicesData(
  center: number,
  radius: number,
  items: string[],
): string[] {
  const sliceAngle = 360 / items.length;

  return items.map((value: string, i: number) => {
    const startAngle = i * sliceAngle - 90; // -90 to rotate the first line to the top
    const endAngle = (i + 1) * sliceAngle - 90;

    const startX = center + radius * Math.cos(degreesToRadians(startAngle));
    const startY = center + radius * Math.sin(degreesToRadians(startAngle));
    const endX = center + radius * Math.cos(degreesToRadians(startAngle));
    const endY = center + radius * Math.sin(degreesToRadians(startAngle));

    const largeArcFlag = sliceAngle <= 180 ? 0 : 1;

    return `M ${center} ${center} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  });
}
