"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import cloud from "@/images/cloud-bg.webp";

// One screen's worth of clouds: left (%), top (svh within the screen),
// width (vmax), opacity. Odd screens are mirrored so the pattern doesn't
// visibly repeat.
const SCREEN_CLOUDS = [
  { left: -8, top: 4, width: 34, opacity: 0.9 },
  { left: 30, top: 12, width: 18, opacity: 0.55 },
  { left: 68, top: 2, width: 26, opacity: 0.75 },
  { left: 88, top: 30, width: 14, opacity: 0.5 },
  { left: -4, top: 46, width: 16, opacity: 0.45 },
  { left: 42, top: 40, width: 40, opacity: 0.6 },
  { left: 76, top: 62, width: 22, opacity: 0.65 },
  { left: 10, top: 76, width: 28, opacity: 0.7 },
  { left: 52, top: 86, width: 20, opacity: 0.5 },
];

// Depth tiers by cloud width (vmax). Each tier is pushed down by `lag` × the
// scroll distance, so on screen small clouds move less (far away) and big
// clouds move more (close).
const TIERS = [
  { maxWidth: 20, lag: 0.35 },
  { maxWidth: 30, lag: 0.2 },
  { maxWidth: Infinity, lag: 0.08 },
];

const tierOf = (width: number) => TIERS.findIndex((t) => width <= t.maxWidth);

const CloudTier = ({
  tier,
  screens,
  scrollY,
}: {
  tier: number;
  screens: number;
  scrollY: MotionValue<number>;
}) => {
  const y = useTransform(scrollY, (v) => v * TIERS[tier].lag);

  return (
    <motion.div className="absolute inset-0" style={{ y }}>
      {Array.from({ length: screens }, (_, screen) => {
        const mirrored = screen % 2 === 1;
        return (
          // One drifting layer per screen; neighbours drift out of step
          <div
            key={screen}
            className="animate-drift absolute inset-x-0 h-[100svh]"
            style={{
              top: `${screen * 100}svh`,
              animationDelay: `${-screen * 9 - tier * 5}s`,
              animationDirection: mirrored ? "alternate-reverse" : "alternate",
            }}
          >
            {SCREEN_CLOUDS.map(({ left, top, width, opacity }, i) =>
              tierOf(width) !== tier ? null : (
                <Image
                  key={i}
                  src={cloud}
                  alt=""
                  className="absolute h-auto max-w-none"
                  style={{
                    left: mirrored
                      ? `calc(${100 - left}% - ${width}vmax)`
                      : `${left}%`,
                    top: `${top}svh`,
                    width: `${width}vmax`,
                    opacity,
                    transform:
                      (i % 2 === 1) !== mirrored ? "scaleX(-1)" : undefined,
                  }}
                />
              ),
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

const Clouds = () => {
  const [screens, setScreens] = useState(1);
  const { scrollY } = useScroll();

  useEffect(() => {
    const update = () =>
      setScreens(
        Math.max(1, Math.ceil(document.body.scrollHeight / window.innerHeight)),
      );
    update();
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {TIERS.map((_, tier) => (
        <CloudTier key={tier} tier={tier} screens={screens} scrollY={scrollY} />
      ))}
    </motion.div>
  );
};

export default Clouds;
