"use client";

import { useEffect, useState } from "react";

// Tiny glowing white dots drifting and twinkling over the sky, spread down
// the whole page. Positions are random per visit, so they're made after
// mount (rendering them on the server would mismatch).
// fewer on phones, where every animated element costs more
const PER_SCREEN = 14;
const PER_SCREEN_PHONE = 6;

interface Dot {
  left: number; // % across
  top: number; // px down the page
  size: number; // px
  twinkle: number; // s per flicker
  float: number; // s per drift
  delay: number; // s
}

const Sparkles = () => {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const make = () => {
      const height = document.body.scrollHeight;
      const perScreen = window.matchMedia("(pointer: coarse)").matches
        ? PER_SCREEN_PHONE
        : PER_SCREEN;
      const count = Math.round((height / window.innerHeight) * perScreen);
      setDots(
        Array.from({ length: count }, () => ({
          left: Math.random() * 100,
          top: Math.random() * height,
          size: 2 + Math.random() * 3,
          twinkle: 1.8 + Math.random() * 2.7,
          float: 6 + Math.random() * 6,
          delay: -Math.random() * 10,
        })),
      );
    };
    make();
    // regenerate if the page gets much taller/shorter (e.g. sections added)
    let last = document.body.scrollHeight;
    const observer = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - last) > window.innerHeight / 2) {
        last = h;
        make();
      }
    });
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {dots.map((d, i) => (
        <span
          key={i}
          className="animate-sparkle-float absolute"
          style={{
            left: `${d.left}%`,
            top: d.top,
            animationDuration: `${d.float}s`,
            animationDelay: `${d.delay}s`,
          }}
        >
          <span
            className="animate-sparkle block rounded-full"
            style={{
              // the dot and its glow in one gradient (cheaper than box-shadow)
              width: d.size * 4,
              height: d.size * 4,
              margin: -d.size * 1.5,
              background:
                "radial-gradient(closest-side, #fff 0%, #fff 22%, rgb(255 255 255 / 0.55) 40%, rgb(255 255 255 / 0) 100%)",
              animationDuration: `${d.twinkle}s`,
              animationDelay: `${d.delay}s`,
            }}
          />
        </span>
      ))}
    </div>
  );
};

export default Sparkles;
