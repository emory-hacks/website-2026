"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import bee from "@/images/rendered-bee.webp";
import { BEE_PATH, HERO_BEE } from "@/lib/bee-path";

type Pt = { x: number; y: number };

// Where along the page the bee should be: it sits where the trail crosses
// this fraction of the screen height
const SCREEN_SPOT = 0.5;
// The bee art faces up-right (-45°, screen angles); rotate from there to face
// along the trail
const ART_HEADING = -45;

// Seconds after page load before the bee pops in at its hero spot (in step
// with the rest of the hero's entrance)
const ENTRANCE_DELAY = 1.5;

// How much trail (px along the path) stays visible behind the bee; it fades
// out toward the end. Hearts stay drawn once finished.
const TRAIL_LENGTH = 280;
// Opacity of each part of the visible tail, newest first
const TAIL_FADE = [1, 0.6, 0.3];
// Spacing (px along the trail) between the trail's dots
const DOT_GAP = 10;
const TAIL_DOTS = Math.ceil(TRAIL_LENGTH / DOT_GAP) + 1;
const DOT_COLOR = "rgb(74 42 20 / 0.55)";

// Loops aren't tied to scroll (half of a loop goes back up the page, which
// looks like the bee reversing). Once the bee reaches one, it flies round it
// on its own in this many ms, then goes back to following the scroll.
const LOOP_MS = 700;
// Scroll distance (px) spent drawing the heart, so the bee doesn't zip round it
const heartScroll = (size: number) => size * 3;

const heartPoint = (t: number, size: number): Pt => {
  // classic heart curve, scaled so the heart is about `size` tall
  const s = size / 30;
  return {
    x: 16 * Math.sin(t) ** 3 * s,
    y:
      -(
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
      ) * s,
  };
};

// Smooth curve through points, one cubic Bézier per gap. Each point's tangent
// follows its neighbours (like Catmull-Rom), but the handles are scaled to the
// gap they belong to, so short loop steps next to long stretches don't
// overshoot and make the trail double back.
const unit = (x: number, y: number) => {
  const len = Math.hypot(x, y) || 1;
  return { x: x / len, y: y / len };
};

const segments = (pts: Pt[]) => {
  const tangents = pts.map((p, i) => {
    const prev = pts[i - 1] ?? p;
    const next = pts[i + 1] ?? p;
    return unit(next.x - prev.x, next.y - prev.y);
  });
  return pts.slice(1).map((p2, i) => {
    const p1 = pts[i];
    const h = Math.hypot(p2.x - p1.x, p2.y - p1.y) / 3;
    const t1 = tangents[i];
    const t2 = tangents[i + 1];
    return `C${p1.x + t1.x * h} ${p1.y + t1.y * h} ${p2.x - t2.x * h} ${p2.y - t2.y * h} ${p2.x} ${p2.y}`;
  });
};

interface Trail {
  d: string;
  width: number;
  height: number;
  // scroll anchors: page y where the bee should be at `length` along the trail
  anchors: { scrollY: number; length: number }[];
  // stretches of the trail (by length) the bee flies on its own
  loops: { start: number; end: number }[];
  // finished hearts stay visible (lengths along the trail)
  hearts: { start: number; end: number; dots: Pt[] }[];
}

const BeeTrail = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<SVGPathElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  // The trail is drawn as a few dots near the bee (moved every frame) rather
  // than as a page-tall path; repainting one of those every frame is slow on
  // phones. Finished hearts are static dots that switch on once drawn.
  const tailRefs = useRef<(SVGCircleElement | null)[]>([]);
  const heartRefs = useRef<(SVGGElement | null)[]>([]);
  const beeRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<Trail | null>(null);

  // Build the trail from the config and the sections' current positions
  useEffect(() => {
    const box = boxRef.current;
    const measure = measureRef.current;
    if (!box || !measure) return;

    const build = () => {
      const boxRect = box.getBoundingClientRect();
      const width = boxRect.width;
      const height = boxRect.height;
      const pts: Pt[] = [];
      const anchorAt: { idx: number; scrollY: number }[] = [];
      const loopAt: { start: number; end: number }[] = [];
      const heartAt: { start: number; end: number }[] = [];

      // The trail starts at the bee's spot in the hero, so it leaves along the
      // trail with its tail right behind it. Measured without the hero's
      // scroll drift (the parent's transform) so it's where it sits at the top.
      const homeEl = [
        ...document.querySelectorAll<HTMLElement>("[data-bee-home]"),
      ].find((e) => e.offsetWidth > 0);
      if (homeEl) {
        const r = homeEl.getBoundingClientRect();
        const t = homeEl.parentElement
          ? getComputedStyle(homeEl.parentElement).transform
          : "none";
        const drift = t && t !== "none" ? new DOMMatrix(t).m42 : 0;
        pts.push({
          x: r.left - boxRect.left + r.width / 2,
          y: r.top - boxRect.top + r.height / 2 - drift,
        });
        // the bee sits here when the page is scrolled to the very top
        anchorAt.push({
          idx: 0,
          scrollY:
            window.innerHeight * SCREEN_SPOT - (boxRect.top + window.scrollY),
        });
      }

      // Page position of every waypoint (skipping ones whose section is missing)
      const placed = BEE_PATH.flatMap((wp) => {
        const section = document.getElementById(wp.at);
        if (!section) return [];
        const r = section.getBoundingClientRect();
        const base = {
          x: (wp.x / 100) * width,
          y: r.top - boxRect.top + wp.y * r.height,
        };
        return [{ wp, base }];
      });

      for (const [i, { wp, base }] of placed.entries()) {
        if (wp.loop) {
          // A handwriting-style loop: curve out to the side, swing round,
          // cross back over itself and carry on — always leaving further along
          // than it came in (a prolate cycloid). It's lined up with the way
          // the trail is travelling here (from the previous point toward the
          // next waypoint), so it flows in and out smoothly at any angle.
          const { r: rad, turn = 1 } = wp.loop;
          const prev = pts[pts.length - 1] ?? base;
          const next = placed[i + 1]?.base ?? base;
          // average of the way in and the way out, so neither end kinks
          const din = unit(base.x - prev.x, base.y - prev.y);
          const dout = unit(next.x - base.x, next.y - base.y);
          const along = unit(din.x + dout.x, din.y + dout.y);
          // the loop's side: right of the trail when heading down (turn 1)
          const side = { x: along.y, y: -along.x };
          const steps = 28;
          const fall = rad * 0.3; // how far along the trail moves per radian (lower = rounder loop)
          const start = pts.length;
          for (let k = 0; k <= steps; k++) {
            const t = -Math.PI + (2 * Math.PI * k) / steps;
            const a = fall * t - rad * Math.sin(t);
            const o = turn * rad * (1 + Math.cos(t));
            pts.push({
              x: base.x + along.x * a + side.x * o,
              y: base.y + along.y * a + side.y * o,
            });
          }
          // Crossing the entry plays the whole loop; the bee then waits at the
          // exit (which sits lower down the page) until scrolling catches up,
          // instead of racing ahead
          const exit = pts.length - 1;
          anchorAt.push({ idx: start, scrollY: pts[start].y });
          anchorAt.push({ idx: exit, scrollY: pts[start].y });
          anchorAt.push({ idx: exit, scrollY: pts[exit].y });
          loopAt.push({ start, end: pts.length - 1 });
        } else if (wp.heart) {
          // trace a heart from its top notch all the way round and back
          const { size } = wp.heart;
          const steps = 28;
          const start = pts.length;
          for (let k = 0; k <= steps; k++) {
            const h = heartPoint((2 * Math.PI * k) / steps, size);
            pts.push({ x: base.x + h.x, y: base.y + h.y });
          }
          heartAt.push({ start, end: pts.length - 1 });
          const done = pts[start].y + heartScroll(size);
          anchorAt.push({ idx: start, scrollY: pts[start].y });
          anchorAt.push({ idx: pts.length - 1, scrollY: done });
          // If the heart ends the trail, fly off a little to the side and rest
          // there so the finished heart stays in view (otherwise the trail
          // just carries on to the next waypoint)
          if (i < placed.length - 1) {
            // carry on to the next waypoint, but climb out of the notch and
            // swing wide over the top of a lobe first, so the trail never
            // crosses the heart (lobes reach ~0.25 × size above the notch and
            // ~0.55 × size out to each side)
            const notch = pts[pts.length - 1];
            const next = placed[i + 1].base;
            const out = next.x < notch.x ? -1 : 1;
            pts.push({
              x: notch.x + out * size * 0.3,
              y: notch.y - size * 0.45,
            });
            pts.push({
              x: notch.x + out * size * 0.95,
              y: notch.y - size * 0.25,
            });
            pts.push({
              x: notch.x + out * size * 1.05,
              y: notch.y + size * 0.9,
            });
          } else {
            const rest = wp.heart.rest ?? { x: size * 1.4, y: -size * 0.2 };
            const notch = pts[pts.length - 1];
            pts.push({
              x: notch.x + rest.x * 0.55,
              y: notch.y + rest.y * 0.55 - size * 0.35,
            });
            pts.push({ x: notch.x + rest.x, y: notch.y + rest.y });
            anchorAt.push({ idx: pts.length - 1, scrollY: done + size * 2 });
          }
        } else {
          pts.push(base);
          anchorAt.push({ idx: pts.length - 1, scrollY: base.y });
        }
      }
      if (pts.length < 2) return;

      const segs = segments(pts);
      const lengthTo = (idx: number) => {
        if (idx === 0) return 0;
        measure.setAttribute(
          "d",
          `M${pts[0].x} ${pts[0].y}${segs.slice(0, idx).join("")}`,
        );
        return measure.getTotalLength();
      };

      // anchors must keep moving down the page so scrolling maps one way
      let last = -Infinity;
      const anchors = anchorAt.map(({ idx, scrollY }) => {
        last = Math.max(scrollY, last + 1);
        return { scrollY: last, length: lengthTo(idx) };
      });

      const loops = loopAt.map(({ start, end }) => ({
        start: lengthTo(start),
        end: lengthTo(end),
      }));

      const d = `M${pts[0].x} ${pts[0].y}${segs.join("")}`;
      const heartLengths = heartAt.map(({ start, end }) => ({
        start: lengthTo(start),
        end: lengthTo(end),
      }));
      // each heart's dots, at the same spacing the tail uses
      measure.setAttribute("d", d);
      const hearts = heartLengths.map(({ start, end }) => {
        const dots: Pt[] = [];
        for (
          let l = Math.ceil(start / DOT_GAP) * DOT_GAP;
          l <= end;
          l += DOT_GAP
        ) {
          const p = measure.getPointAtLength(l);
          dots.push({ x: p.x, y: p.y });
        }
        return { start, end, dots };
      });

      setTrail({
        d,
        width,
        height,
        anchors,
        loops,
        hearts,
      });
    };

    build();
    const observer = new ResizeObserver(build);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  // Move the bee along the trail as the page scrolls
  useEffect(() => {
    const path = pathRef.current;
    const beeEl = beeRef.current;
    const box = boxRef.current;
    if (!trail || !path || !beeEl || !box) return;

    const total = path.getTotalLength();
    const { anchors, loops } = trail;

    // Asking the browser for a point on a page-long path is slow (it walks
    // the whole path each time), so sample it once and interpolate after
    const STEP = 4;
    const samples = Array.from(
      { length: Math.ceil(total / STEP) + 1 },
      (_, i) => path.getPointAtLength(Math.min(i * STEP, total)),
    );
    const pointOn = (len: number) => {
      const f = Math.min(Math.max(len, 0), total) / STEP;
      const i = Math.min(Math.floor(f), samples.length - 2);
      const t = f - i;
      const a = samples[i];
      const b = samples[i + 1];
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    };
    let current = -1;
    let target = 0;
    let frame = 0;
    let lastTime = 0;

    const targetLength = () => {
      const boxTop = box.getBoundingClientRect().top + window.scrollY;
      let y = window.scrollY + window.innerHeight * SCREEN_SPOT - boxTop;
      // Near the bottom of the page the screen can't scroll far enough for the
      // bee to reach the end of the trail, so over the last screen of
      // scrolling, gradually push it further along until it arrives
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const reach = maxScroll + window.innerHeight * SCREEN_SPOT - boxTop;
      const overshoot = anchors[anchors.length - 1].scrollY - reach;
      if (overshoot > 0) {
        const ramp = window.innerHeight;
        const t = Math.min(
          Math.max((window.scrollY - (maxScroll - ramp)) / ramp, 0),
          1,
        );
        y += overshoot * t;
      }
      if (y <= anchors[0].scrollY) return anchors[0].length;
      for (let i = 1; i < anchors.length; i++) {
        const a = anchors[i - 1];
        const b = anchors[i];
        if (y <= b.scrollY) {
          const t = (y - a.scrollY) / (b.scrollY - a.scrollY);
          return a.length + t * (b.length - a.length);
        }
      }
      return total;
    };

    // which way the bee is flying: 1 = down the trail (scrolling down),
    // -1 = back up it (scrolling up); it faces that way
    let heading = 1;

    // The hero spot's centre (in trail coordinates) and how big the bee should
    // be there relative to its normal size; null if there's no visible spot
    const homeSpot = () => {
      const boxRect = box.getBoundingClientRect();
      const el = [
        ...document.querySelectorAll<HTMLElement>("[data-bee-home]"),
      ].find((e) => e.offsetWidth > 0);
      if (!el || !beeEl.offsetWidth) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.left - boxRect.left + r.width / 2,
        y: r.top - boxRect.top + r.height / 2,
        scale: r.width / beeEl.offsetWidth,
      };
    };

    let shownRot: number | null = null;
    // signed smallest turn (deg) between two headings, in (-180, 180]
    const shortTurn = (d: number) => (((d % 360) + 540) % 360) - 180;

    const place = (len: number) => {
      const p = pointOn(len);
      const q = pointOn(Math.min(len + 2, total));
      const back = pointOn(Math.max(len - 2, 0));
      const dir =
        len + 2 <= total
          ? Math.atan2(q.y - p.y, q.x - p.x)
          : Math.atan2(p.y - back.y, p.x - back.x);
      const angle =
        (dir * 180) / Math.PI + (heading < 0 ? 180 : 0) - ART_HEADING;
      // Near the top of the page, blend from the bee's hero spot onto the trail
      const handoff = window.innerHeight * HERO_BEE.handoff;
      const raw = Math.min(Math.max(window.scrollY / handoff, 0), 1);
      const mix = raw * raw * (3 - 2 * raw); // smoothstep
      const home = homeSpot();
      let goal = angle;
      let scale = 1;
      if (home && mix < 1) {
        // grow to the hero size and settle into the hero pose near the top
        scale = home.scale + (1 - home.scale) * mix;
        goal = HERO_BEE.angle + shortTurn(angle - HERO_BEE.angle) * mix;
      }
      // turn toward the goal angle gradually instead of snapping (e.g. when
      // the scroll direction flips and the bee turns around)
      if (shownRot === null) shownRot = goal;
      else shownRot += shortTurn(goal - shownRot) * 0.25;
      beeEl.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) rotate(${shownRot}deg) scale(${scale})`;
      const settled = Math.abs(shortTurn(goal - shownRot)) < 0.5;

      // Tail: dots on the stretch just behind the bee (the side it came
      // from). They sit at fixed spots along the trail, so they stay put as
      // the bee moves, and fade out toward the end. It grows in as the bee
      // leaves the hero.
      const reach = TRAIL_LENGTH * mix;
      const first =
        heading > 0
          ? Math.floor(len / DOT_GAP) * DOT_GAP
          : Math.ceil(len / DOT_GAP) * DOT_GAP;
      tailRefs.current.forEach((dot, k) => {
        if (!dot) return;
        const at = first - heading * k * DOT_GAP;
        const dist = Math.abs(len - at);
        if (at < 0 || at > total || dist > reach) {
          dot.setAttribute("opacity", "0");
          return;
        }
        const pt = pointOn(at);
        const fade =
          TAIL_FADE[
            Math.min(
              TAIL_FADE.length - 1,
              Math.floor((dist / TRAIL_LENGTH) * TAIL_FADE.length),
            )
          ];
        dot.setAttribute("cx", `${pt.x}`);
        dot.setAttribute("cy", `${pt.y}`);
        dot.setAttribute("opacity", `${fade}`);
      });
      // finished hearts stay drawn
      trail.hearts.forEach((h, k) =>
        heartRefs.current[k]?.setAttribute(
          "visibility",
          len >= h.end ? "visible" : "hidden",
        ),
      );
      return settled;
    };

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;
      const dir = Math.sign(target - current);
      if (dir) heading = dir;
      const loop = loops.find((l) =>
        dir > 0
          ? current >= l.start && current < l.end
          : current > l.start && current <= l.end,
      );

      if (loop) {
        // inside a loop: fly round it at a steady pace
        const step = ((loop.end - loop.start) / LOOP_MS) * dt;
        current += dir * Math.min(step, Math.abs(target - current));
      } else {
        // otherwise ease toward the target so the bee glides, but stop at a
        // loop's edge so the loop always plays in full
        let next = current + (target - current) * 0.2;
        for (const l of loops) {
          if (dir > 0 && current < l.start && next > l.start) next = l.start;
          if (dir < 0 && current > l.end && next < l.end) next = l.end;
        }
        current = next;
      }
      if (Math.abs(target - current) < 0.5) current = target;
      const turned = place(current);
      frame = current === target && turned ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = targetLength();
      if (current < 0) {
        current = target;
        place(current);
      } else if (!frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [trail]);

  return (
    <div
      ref={boxRef}
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
      aria-hidden
    >
      <svg
        className="absolute left-0 top-0"
        width={trail?.width ?? 0}
        height={trail?.height ?? 0}
      >
        <path ref={measureRef} fill="none" stroke="none" />
        {/* full trail: only used to measure positions along it, not drawn */}
        {trail && <path ref={pathRef} d={trail.d} fill="none" stroke="none" />}
        {Array.from({ length: TAIL_DOTS }, (_, k) => (
          <circle
            key={k}
            ref={(el) => {
              tailRefs.current[k] = el;
            }}
            r={1.5}
            fill={DOT_COLOR}
            opacity={0}
          />
        ))}
        {trail?.hearts.map((h, k) => (
          <g
            key={k}
            ref={(el) => {
              heartRefs.current[k] = el;
            }}
            visibility="hidden"
          >
            {h.dots.map((p, j) => (
              <circle key={j} cx={p.x} cy={p.y} r={1.5} fill={DOT_COLOR} />
            ))}
          </g>
        ))}
      </svg>

      <div
        ref={beeRef}
        className="absolute left-0 top-0 w-12 will-change-transform md:w-16"
        style={{ visibility: trail ? "visible" : "hidden" }}
      >
        {/* Entrance: pops in with a spin just after the hero's own bee */}
        <motion.div
          initial={{ opacity: 0, scale: 0.2, rotate: -200 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: ENTRANCE_DELAY,
            type: "spring",
            stiffness: 120,
            damping: 11,
            opacity: { delay: ENTRANCE_DELAY, duration: 0.3 },
          }}
        >
          <div className="animate-bob">
            <Image src={bee} alt="" className="h-auto w-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BeeTrail;
