import type React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  getSliceData,
  buildPathString,
  getLabelData,
} from "../lib/sliceGeometry";
import type { Slice, WheelItem } from "../types/types";
import {
  getItemWeights,
  getLandingPosition,
  getTotalRotation,
  pickWinningIndex,
} from "../lib/wheelMath";

gsap.registerPlugin(useGSAP);

const WHEEL_CENTER = 250;
const WHEEL_RADIUS = 200;
const WHEEL_BUTTON_RADIUS = 40;

function Wheel({
  items,
  onResult,
}: {
  items: WheelItem[];
  onResult: (winner: string) => void;
}): React.JSX.Element {
  const container = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: container });
  const slices: Slice[] = getSliceData(
    WHEEL_CENTER,
    WHEEL_RADIUS,
    items.length,
  );
  const paths = slices.map((slice: Slice, index: number): React.JSX.Element => {
    const { textAngle, textX, textY } = getLabelData(
      WHEEL_CENTER,
      (WHEEL_RADIUS + WHEEL_BUTTON_RADIUS) / 2,
      slice,
    );

    return (
      <g key={index}>
        <path
          d={buildPathString(WHEEL_CENTER, WHEEL_RADIUS, slice)}
          stroke="black"
          strokeWidth="3"
          fill="teal"
        />
        <text
          x={textX}
          y={textY}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${textAngle}, ${textX}, ${textY})`}
        >
          {items[index].name}
        </text>
      </g>
    );
  });

  const spinWheel = contextSafe(() => {
    const winningItem = pickWinningIndex(getItemWeights(items));
    const landingPosition = getTotalRotation(
      getLandingPosition(winningItem, items.length),
      5,
    );
    const winningName = items[winningItem].name;

    gsap.to(".wheel", {
      rotation: landingPosition,
      svgOrigin: `${WHEEL_CENTER} ${WHEEL_CENTER}`,
      ease: "power2.out",
      duration: 5,
      onComplete: () => onResult(winningName),
    });
  });

  return (
    <div ref={container}>
      <svg viewBox="0 0 500 500">
        <g className="wheel">{paths}</g>
        <circle
          cx={WHEEL_CENTER}
          cy={WHEEL_CENTER}
          r={WHEEL_RADIUS}
          stroke="salmon"
          strokeWidth="5"
          fill="none"
        />
        <path
          d="M 250 75 L 235 45 A 17 17 0 1 1 265 45 Z"
          stroke="black"
          fill="yellow"
        />
        <circle cx="250" cy="35" r="5" stroke="black" fill="black" />
        <circle
          cx={WHEEL_CENTER}
          cy={WHEEL_CENTER}
          r={WHEEL_BUTTON_RADIUS}
          stroke="black"
          strokeWidth="3"
          fill="salmon"
          onClick={spinWheel}
        />
      </svg>
    </div>
  );
}

export default Wheel;
