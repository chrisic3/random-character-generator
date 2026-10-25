import type React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  getSliceData,
  buildPathString,
  getLabelData,
} from "../lib/sliceGeometry";
import type { Slice, WheelProps } from "../types/types";
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

function Wheel(props: WheelProps): React.JSX.Element {
  const label =
    props.mode === "spin" ? "Spin" : props.mode === "next" ? "Next" : "Reset";
  const container = useRef<HTMLDivElement>(null);
  const hasSpinStarted = useRef<boolean>(false);
  const { contextSafe } = useGSAP({ scope: container });
  const slices: Slice[] = getSliceData(
    WHEEL_CENTER,
    WHEEL_RADIUS,
    props.items.length,
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
          {props.items[index].name}
        </text>
      </g>
    );
  });

  const spinWheel = contextSafe(() => {
    if (props.mode === "spin") {
      if (hasSpinStarted.current) return;
      hasSpinStarted.current = true;

      const winningItem = pickWinningIndex(getItemWeights(props.items));
      const landingPosition = getTotalRotation(
        getLandingPosition(winningItem, props.items.length),
        5,
      );
      const winningName = props.items[winningItem].name;

      gsap.to(".wheel", {
        rotation: landingPosition,
        svgOrigin: `${WHEEL_CENTER} ${WHEEL_CENTER}`,
        ease: "power2.out",
        duration: 5,
        onComplete: () => props.onResult(winningName),
      });
    } else {
      props.onClick();
    }
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
        <g className="cursor-pointer" onClick={spinWheel}>
          <circle
            cx={WHEEL_CENTER}
            cy={WHEEL_CENTER}
            r={WHEEL_BUTTON_RADIUS}
            stroke="black"
            strokeWidth="3"
            fill="salmon"
          />
          <text
            x={WHEEL_CENTER}
            y={WHEEL_CENTER}
            textAnchor="middle"
            dominantBaseline="middle"
            pointerEvents="none"
          >
            {label}
          </text>
        </g>
      </svg>
    </div>
  );
}

export default Wheel;
