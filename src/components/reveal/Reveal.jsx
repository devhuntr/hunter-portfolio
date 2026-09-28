import React from "react";
import {motion, useReducedMotion} from "motion/react";

// Preserve each section's element and layout while sharing a restrained entrance.
export function Fade({
  children,
  left,
  right,
  bottom,
  distance = "20px",
  duration = 500
}) {
  const reducedMotion = useReducedMotion();
  const child = React.Children.only(children);
  const animateEntrance =
    !reducedMotion && typeof IntersectionObserver !== "undefined";
  return (
    <motion.div
      {...child.props}
      initial={false}
      whileInView={
        animateEntrance
          ? {
              opacity: [0.55, 1],
              x: [left ? `-${distance}` : right ? distance : "0px", "0px"],
              y: [bottom ? distance : "0px", "0px"]
            }
          : undefined
      }
      viewport={{once: true, amount: 0.05}}
      transition={{duration: Math.min(duration, 500) / 1000, ease: "easeOut"}}
    />
  );
}
export const Slide = Fade;
