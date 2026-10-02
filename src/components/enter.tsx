"use client";

import { motion, type TargetAndTransition } from "motion/react";

// Springs an element in from `from` (offset/scale/rotation) on page load
const Enter = ({
  children,
  from,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  from: TargetAndTransition;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, ...from }}
    animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
    transition={{
      delay,
      type: "spring",
      stiffness: 70,
      damping: 14,
      opacity: { delay, duration: 0.6, ease: "easeOut" },
    }}
  >
    {children}
  </motion.div>
);

export default Enter;
