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

// Register the useGSAP hook with GSAP (required once before the hook is used)
gsap.registerPlugin(useGSAP);

// Sizes in SVG units. The <svg> below has a 500 x 500 viewBox, so the wheel sits in the
// middle of it, and the whole drawing scales to fit however wide the page is.
const WHEEL_CENTER = 250;
const WHEEL_RADIUS = 200;
const WHEEL_BUTTON_RADIUS = 40;

// The spinning wheel for a single category.
// The center button changes with `mode`: it spins the wheel, then (once there is a result)
// moves to the next category, or resets after the last one. App decides the mode.
function Wheel(props: WheelProps): React.JSX.Element {
  // text shown on the center button
  const label =
    props.mode === "spin" ? "Spin" : props.mode === "next" ? "Next" : "Reset";
  // points at the outer <div> so GSAP only searches inside this component
  const container = useRef<HTMLDivElement>(null);
  // Remembers that a spin has started. A ref is used instead of state because changing it
  // shouldn't re-render, and it updates immediately, so a quick double click can't start two spins.
  const hasSpinStarted = useRef<boolean>(false);
  // `scope` limits GSAP's ".wheel" selector to this component, and useGSAP cleans up the
  // animation when the component unmounts. contextSafe wraps functions (like the click
  // handler below) that run later, so they are tracked and cleaned up too.
  const { contextSafe } = useGSAP({ scope: container });
  // work out the shape of every slice (angles and edge points) from the number of items
  const slices: Slice[] = getSliceData(
    WHEEL_CENTER,
    WHEEL_RADIUS,
    props.items.length,
  );
  // One colored wedge plus its label for each item. Slices and items are in the same order,
  // so props.items[index] is always the item that belongs to this slice.
  const paths = slices.map((slice: Slice, index: number): React.JSX.Element => {
    // Put the label halfway between the center button and the outer edge, where
    // there is the most room for the text
    const { textAngle, textX, textY } = getLabelData(
      WHEEL_CENTER,
      (WHEEL_RADIUS + WHEEL_BUTTON_RADIUS) / 2,
      slice,
    );

    return (
      <g key={index}>
        {/* the wedge itself; the colors repeat if there are more slices than colors */}
        <path
          d={buildPathString(WHEEL_CENTER, WHEEL_RADIUS, slice)}
          stroke="purple"
          strokeWidth="3"
          fill={colors[index % colors.length]}
        />
        {/* textAnchor and dominantBaseline center the text on its x/y point (horizontally
            and vertically); the transform then rotates it around that same point so it
            runs along the slice, from the center outward */}
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

  // Click handler for the center button.
  // In "spin" mode it spins the wheel; in "next" / "reset" mode it just calls the parent's
  // onClick. TypeScript allows props.onClick in the else branch because it can tell
  // the mode isn't "spin" there (see WheelProps).
  const spinWheel = contextSafe(() => {
    if (props.mode === "spin") {
      // ignore clicks while a spin is already running
      if (hasSpinStarted.current) return;
      hasSpinStarted.current = true;

      // The winner is chosen up front, before any animation. The wheel is then rotated to
      // land on that slice, so the result is decided by the weights, not by the animation.
      // The 5 is how many full turns to spin before stopping.
      const winningItem = pickWinningIndex(getItemWeights(props.items));
      const landingPosition = getTotalRotation(
        getLandingPosition(winningItem, props.items.length),
        5,
      );
      const winningName = props.items[winningItem].name;

      // Animate the ".wheel" group (only inside this component, thanks to the scope):
      //   rotation  - total degrees to turn, including the extra full spins
      //   svgOrigin - pivot point in SVG coordinates, so it spins around the wheel's
      //               center instead of the SVG's top-left corner
      //   ease      - "power2.out" starts fast and slows down toward the end, like a real wheel
      //   duration  - seconds the spin takes
      //   onComplete - runs when the spin stops; this is when the result gets reported,
      //                so the winner only appears in the list after the wheel has landed
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
      {/* Layers are drawn in order, so later elements appear on top of earlier ones:
          slices -> rim -> pointer -> center button */}
      <svg viewBox="0 0 500 500">
        {/* only this group rotates; the rim, pointer and button stay still */}
        <g className="wheel">{paths}</g>
        {/* outer rim: an unfilled circle drawn over the slices' outer edges for a clean border */}
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
        {/* pointer at the top that marks the winning slice: the point (250,75) touches the
            wheel and the other points make the arrow's body above it */}
        <polygon points="250,75 240,50 240,30 260,30 260,50" fill="black" />
        {/* Center button (Spin / Next / Reset). The click handler is on the group so
            clicking either the circle or the text works. */}
        <g className="cursor-pointer" onClick={spinWheel}>
          <circle
            cx={WHEEL_CENTER}
            cy={WHEEL_CENTER}
            r={WHEEL_BUTTON_RADIUS}
            stroke="purple"
            strokeWidth="3"
            fill="salmon"
          />
          {/* pointerEvents="none" lets clicks pass through the text to the group */}
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
