"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "motion/react";
import { reveal } from "@/components/scroll-motion";

// Heading text with a small flower growing up on each side of it. Sized in em,
// so the flowers scale with whatever font size the heading has.
const FlowerTitle = ({
  children,
  left,
  right,
}: {
  children: React.ReactNode;
  left: StaticImageData;
  right: StaticImageData;
}) => (
  <span className="relative inline-block">
    {[
      { src: left, side: "right-full mr-[0.2em]", flip: true, delay: 0.25 },
      { src: right, side: "left-full ml-[0.05em]", flip: false, delay: 0.4 },
    ].map(({ src, side, flip, delay }) => (
      <motion.span
        key={side}
        {...reveal(delay, 20, 0.5)}
        className={`pointer-events-none absolute bottom-[-0.15em] block origin-bottom ${side}`}
        aria-hidden
      >
        <span
          className="animate-sway block origin-bottom"
          style={{ animationDelay: `${-delay * 10}s` }}
        >
          <Image
            src={src}
            alt=""
            className="h-[1.5em] w-auto max-w-none"
            style={{ transform: flip ? "scaleX(-1)" : undefined }}
          />
        </span>
      </motion.span>
    ))}
    {children}
  </span>
);

export default FlowerTitle;
