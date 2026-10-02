"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Props for a motion element that fades up the first time it scrolls into view
export const reveal = (delay = 0, y = 40, scale = 1) => ({
  initial: { opacity: 0, y, scale },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: {
    delay,
    type: "spring" as const,
    stiffness: 70,
    damping: 16,
    opacity: { delay, duration: 0.6, ease: "easeOut" as const },
  },
});

// Moves its children vertically as they scroll past: positive speeds lag
// behind the page (feel far away), negative speeds rush ahead (feel close).
// `speed` is the travel in svh across the element's time on screen.
export const Parallax = ({
  children,
  speed,
  className = "",
}: {
  children: React.ReactNode;
  speed: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-speed}svh`, `${speed}svh`],
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};
