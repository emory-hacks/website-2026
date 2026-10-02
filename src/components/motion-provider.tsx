"use client";

import { MotionConfig } from "motion/react";

// Skips motion animations for visitors with "reduce motion" turned on
const MotionProvider = ({ children }: { children: React.ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

export default MotionProvider;
