"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useReducedMotion,
} from "motion/react";
import { reveal } from "@/components/scroll-motion";
import SkyGlow from "@/components/sky-glow";
import tracksData from "@/lib/tracks.json";
import ladybug from "@/images/bug-ladybug.webp";
import ant from "@/images/bug-ant.webp";
import beetle from "@/images/bug-beetle.webp";
import caterpillar from "@/images/bug-caterpillar.webp";

interface Track {
  title: string;
  desc: string;
  /** which bug walks for this track (set in tracks.json) */
  bug?: string;
}

const data: Track[] = tracksData;

// Bug art by name; each track picks one with "bug" in tracks.json
const BUGS = { ladybug, ant, beetle, caterpillar };
const bugFor = (t: Track) => BUGS[t.bug as keyof typeof BUGS] ?? ladybug;

// How far each bug sinks onto the vine, as % of its own height. Bigger = sits
// lower. The beetle is drawn from above with legs poking out, so it needs more.
const SINK: Record<string, number> = {
  ladybug: 12,
  ant: 12,
  caterpillar: 12,
  beetle: 30,
};
const sinkFor = (t: Track) => SINK[t.bug ?? ""] ?? 12;

// Seconds for a bug to walk the whole loop
const LOOP_SECONDS = 48;

// The vine, in a 600×600 box pinned to the screen's left edge: it comes in
// off the top-left, sweeps right, curls, and leaves off the bottom-left.
// Bugs walk it end to end; both ends are off-screen, so the wrap is hidden.
const VIEW = 600;
const VINE =
  "M-60 50 C120 10 340 30 440 150 C540 270 490 440 350 460 C220 480 185 345 270 312 C355 280 410 400 335 500 C275 580 110 575 -60 560";

// Point on the vine plus the direction it's heading there
const pointAt = (path: SVGPathElement, d: number, len: number) => {
  const a = path.getPointAtLength(Math.min(d, len - 3));
  const b = path.getPointAtLength(Math.min(d, len - 3) + 3);
  return {
    x: a.x,
    y: a.y,
    angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI,
  };
};

const TrackDetails = ({
  track,
  className = "",
}: {
  track: Track;
  className?: string;
}) => (
  <div className={className} aria-hidden={className.includes("invisible")}>
    <h3 className="font-read text-[30px] font-bold leading-tight tracking-wide text-[#4a2a14] md:text-[38px]">
      {track.title.toLowerCase()}
    </h3>
    <p className="pt-4 font-read mt-2 text-justify hyphens-none text-[17px] leading-relaxed tracking-wide text-[#4a2a14] md:text-[21px]">
      {track.desc}
    </p>
  </div>
);

const TracksSection = () => {
  // Nothing selected until someone hovers/taps a bug; the panel shows a hint
  const [active, setActive] = useState<number | null>(null);
  const track = active === null ? null : data[active];

  const pathRef = useRef<SVGPathElement>(null);
  const bugRefs = useRef<(HTMLDivElement | null)[]>([]);
  const elapsed = useRef(0);
  const reduceMotion = useReducedMotion();

  // Walk each bug along the loop, evenly spaced, facing the way it's going
  useAnimationFrame((_, delta) => {
    const path = pathRef.current;
    if (!path) return;
    if (!reduceMotion) elapsed.current += delta;
    const len = path.getTotalLength();

    data.forEach((_, i) => {
      const el = bugRefs.current[i];
      if (!el) return;
      const p = (elapsed.current / 1000 / LOOP_SECONDS + i / data.length) % 1;
      const a = pointAt(path, p * len, len);
      el.style.left = `${(a.x / VIEW) * 100}%`;
      el.style.top = `${(a.y / VIEW) * 100}%`;
      // Pivot on the feet so the bug always rides the same side of the vine
      // (hanging underneath on stretches that head left), feet slightly sunk
      // into the stem
      const body = el.querySelector<HTMLElement>("[data-bug-body]");
      if (body)
        body.style.transform = `rotate(${a.angle}deg) translateY(${sinkFor(data[i])}%)`;

      // Bubble floats past the bug's back (whichever way it's facing),
      // upright, with two thought-bubble dots trailing back to the bug
      const bubble = el.querySelector<HTMLElement>("[data-bug-bubble]");
      if (bubble) {
        const rad = (a.angle * Math.PI) / 180;
        const up = { x: Math.sin(rad), y: -Math.cos(rad) };
        const back = el.offsetWidth * 0.6; // feet → top of the bug's back
        // distance from the bubble's centre to its oval edge facing the bug
        const rx = bubble.offsetWidth / 2;
        const ry = bubble.offsetHeight / 2;
        const edge = 1 / Math.sqrt((up.x / rx) ** 2 + (up.y / ry) ** 2 || 1);
        const at = (d: number) =>
          `translate(calc(-50% + ${up.x * d}px), calc(-50% + ${up.y * d}px))`;

        // keep the bubble on screen: nudge it sideways if it would poke past
        // either edge (the thought dots stay pointing at the bug)
        const d = back + 30 + edge;
        const anchorX = el.getBoundingClientRect().left + el.offsetWidth / 2;
        const centreX = anchorX + up.x * d;
        const margin = 8;
        // only while the bug itself is on screen; as it walks off an edge the
        // bubble and dots fade out instead of hanging around without it
        const onScreen = anchorX > 0 && anchorX < window.innerWidth;
        const nudge = onScreen
          ? Math.max(margin + rx - centreX, 0) -
            Math.max(centreX + rx - (window.innerWidth - margin), 0)
          : 0;
        const fade = onScreen ? "1" : "0";
        bubble.style.opacity = fade;
        bubble.style.transform = `translate(calc(-50% + ${up.x * d + nudge}px), calc(-50% + ${up.y * d}px))`;
        const dots = el.querySelectorAll<HTMLElement>("[data-bubble-dot]");
        dots[0]?.style.setProperty("transform", at(back + 6));
        dots[1]?.style.setProperty("transform", at(back + 18));
        dots.forEach((dot) => (dot.style.opacity = fade));
      }
    });
  });

  return (
    <section
      id="tracks"
      className="relative flex w-full flex-col items-center overflow-x-clip px-5 py-20 landscape:min-h-[100svh] landscape:justify-center landscape:py-24"
    >
      <motion.h2
        {...reveal()}
        className="section-title section-title-mobile relative z-20 landscape:ml-[52%] landscape:self-start landscape:pl-0 landscape:text-[clamp(44px,5.35vw,64px)]"
      >
        tracks
      </motion.h2>

      <div className="mt-6 flex w-full flex-col gap-6 landscape:static">
        {/* Vine with the bugs walking around it */}
        <motion.div
          {...reveal(0.15, 40)}
          className="crawl-lane relative z-30 aspect-square portrait:-ml-5 portrait:w-[min(100vw,520px)] portrait:self-start landscape:absolute landscape:left-0 landscape:top-1/2 landscape:w-[min(46vw,76svh)] landscape:-translate-y-1/2"
        >
          <svg
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden
          >
            <path
              ref={pathRef}
              d={VINE}
              fill="none"
              stroke="#8fbf4d"
              strokeWidth="9"
              strokeLinecap="round"
            />
          </svg>

          {data.map((t, i) => {
            const selected = i === active;
            return (
              // A zero-height anchor sitting on the vine point; the bug stands
              // on it and turns around it, the tag stays upright above it
              <div
                key={t.title}
                ref={(el) => {
                  bugRefs.current[i] = el;
                }}
                className="absolute h-0 w-[15%] -translate-x-1/2"
                style={{
                  left: `${(i / data.length) * 100}%`,
                  top: "50%",
                }}
              >
                <span
                  data-bug-bubble
                  className={`pointer-events-none absolute left-1/2 top-0 z-10 whitespace-nowrap rounded-[999px] border-2 border-[#f26c4f] px-2 py-0.5 text-[11px] sm:px-3 sm:py-1 sm:text-[13px] tracking-wide shadow-sm transition-[color,background-color,opacity] duration-300 md:text-[15px] ${
                    selected
                      ? "bg-[#f26c4f] text-[#fffbe3]"
                      : "bg-[#fffbe3] text-[#f26c4f]"
                  }`}
                >
                  {t.title.toLowerCase()}!
                </span>
                {[0, 1].map((k) => (
                  <span
                    key={k}
                    data-bubble-dot
                    className={`pointer-events-none absolute left-1/2 top-0 z-10 rounded-full border-2 border-[#f26c4f] transition-opacity duration-300 ${
                      k === 0 ? "size-1.5" : "size-2.5"
                    } ${selected ? "bg-[#f26c4f]" : "bg-[#fffbe3]"}`}
                    aria-hidden
                  />
                ))}
                <button
                  type="button"
                  data-bug-body
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={selected}
                  aria-label={`${t.title} track`}
                  className="bug absolute bottom-0 left-0 block w-full origin-bottom focus:outline-none"
                >
                  <span
                    className="animate-waddle block origin-bottom"
                    style={{ animationDelay: `${-i * 0.2}s` }}
                  >
                    <Image src={bugFor(t)} alt="" className="h-auto w-full" />
                  </span>
                </button>
              </div>
            );
          })}
        </motion.div>

        {/* Details for the selected track, top-right */}
        <motion.div
          {...reveal(0.3, 30)}
          className="relative w-full max-w-xl portrait:mx-auto portrait:text-center landscape:ml-[52%] landscape:mt-4 landscape:w-[42%]"
          aria-live="polite"
        >
          <SkyGlow />
          {/* Every track's text sits invisibly in the same grid cell, so the
              panel is always as tall as the longest one and nothing above or
              below shifts when the description changes */}
          <div className="relative grid">
            {data.map((t) => (
              <TrackDetails
                key={t.title}
                track={t}
                className="invisible col-start-1 row-start-1"
              />
            ))}
            <div className="col-start-1 row-start-1">
              <AnimatePresence mode="wait">
                {track ? (
                  <motion.div
                    key={track.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <TrackDetails track={track} />
                  </motion.div>
                ) : (
                  <motion.p
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="relative text-[24px] tracking-wide text-[#4a2a14]/60 md:text-[32px]"
                  >
                    {/* touch screens can't hover, so they get "click" */}
                    <span className="pointer-coarse:hidden">
                      hover over a bug to meet its track!
                    </span>
                    <span className="hidden pointer-coarse:inline">
                      click a bug to meet its track!
                    </span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TracksSection;
