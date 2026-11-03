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
import { colors } from "../data";

gsap.registerPlugin(useGSAP);

// sizes in SVG units (the viewBox is 500 x 500)
const WHEEL_CENTER = 250;
const WHEEL_RADIUS = 200;
const WHEEL_BUTTON_RADIUS = 40;

// spinning wheel for a single category; the center button spins it, then moves on or resets
function Wheel(props: WheelProps): React.JSX.Element {
  const label =
    props.mode === "spin" ? "Spin" : props.mode === "next" ? "Next" : "Reset";
  const container = useRef<HTMLDivElement>(null);
  // guards against double clicks starting a second spin
  const hasSpinStarted = useRef<boolean>(false);
  // scope GSAP selectors to this component and clean up animations on unmount
  const { contextSafe } = useGSAP({ scope: container });
  const slices: Slice[] = getSliceData(
    WHEEL_CENTER,
    WHEEL_RADIUS,
    props.items.length,
  );
  // one colored wedge + label per item
  const paths = slices.map((slice: Slice, index: number): React.JSX.Element => {
    // put labels halfway between the center button and the outer edge
    const { textAngle, textX, textY } = getLabelData(
      WHEEL_CENTER,
      (WHEEL_RADIUS + WHEEL_BUTTON_RADIUS) / 2,
      slice,
    );

    return (
      <g key={index}>
        <path
          d={buildPathString(WHEEL_CENTER, WHEEL_RADIUS, slice)}
          stroke="purple"
          strokeWidth="3"
          fill={colors[index % colors.length]}
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

  // center button handler: spin in "spin" mode, otherwise hand off to the parent (next / reset)
  const spinWheel = contextSafe(() => {
    if (props.mode === "spin") {
      if (hasSpinStarted.current) return;
      hasSpinStarted.current = true;

      // pick the winner first, then work out the rotation that lands on it (5 full spins first)
      const winningItem = pickWinningIndex(getItemWeights(props.items));
      const landingPosition = getTotalRotation(
        getLandingPosition(winningItem, props.items.length),
        5,
      );
      const winningName = props.items[winningItem].name;

      // rotate around the wheel's center, slowing down at the end, and report the winner once it stops
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
      <h2 className="text-2xl text-center">
        <span className="text-3xl font-bold">CURRENT CATEGORY:</span>{" "}
        {props.category}
      </h2>
      <svg viewBox="0 0 500 500">
        {/* only this group rotates; the rim, pointer and button stay still */}
        <g className="wheel">{paths}</g>
        {/* outer rim */}
        <circle
          cx={WHEEL_CENTER}
          cy={WHEEL_CENTER}
          r={WHEEL_RADIUS}
          stroke="purple"
          strokeWidth="5"
          fill="none"
        />
        {/* <path
          d="M 250 75 L 235 45 A 17 17 0 1 1 265 45 Z"
          stroke="black"
          fill="yellow"
        />
        <circle cx="250" cy="35" r="5" stroke="black" fill="black" /> */}
        {/* pointer at the top that marks the winning slice */}
        <polygon points="250,75 240,50 240,30 260,30 260,50" fill="black" />
        {/* center button (Spin / Next / Reset) */}
        <g className="cursor-pointer" onClick={spinWheel}>
          <circle
            cx={WHEEL_CENTER}
            cy={WHEEL_CENTER}
            r={WHEEL_BUTTON_RADIUS}
            stroke="purple"
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
