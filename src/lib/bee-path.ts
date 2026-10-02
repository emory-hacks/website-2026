// The bee's trail down the page. Edit these to reshape the path.
//
// Every entry is pinned to a section (by its id), so the trail stays in place
// when sections change height:
//   at  section id: "landing" | "about" | "tracks" | "schedule" | "qna" | "sponsors"
//   x   0–100, % across the page (0 = left edge)
//   y   0–1, how far down that section (0 = its top, 1 = its bottom)
//
// Shapes:
//   { loop: { r } }    one loop at that spot, for a trail heading down; r is
//                      roughly its radius in px. It swings out to the right;
//                      use `turn: -1` to swing it out to the left.
//   { heart: { size } } draws a heart there (size in px); put it last. After
//                      drawing it the bee flies off and rests beside it so
//                      the heart stays visible. Move the resting spot with
//                      `rest: { x, y }` (px from the heart's top; default is
//                      to the right: { x: 1.4 × size, y: -0.2 × size }).
//
// The line passes through the points in order, smoothed into curves.

export type BeeWaypoint = {
  at: string;
  x: number;
  y: number;
  loop?: { r: number; turn?: 1 | -1 };
  heart?: { size: number; rest?: { x: number; y: number } };
};

export const BEE_PATH: BeeWaypoint[] = [
  // leaving the landing page…
  { at: "landing", x: 55, y: 0.8 },
  // …across the top of About to the right side
  { at: "about", x: 80, y: 0.1 },
  { at: "about", x: 88, y: 0.35 },
  // straight down the right, with one round loop where About meets Tracks
  { at: "about", x: 88, y: 0.95, loop: { r: 60, turn: -1 } },
  { at: "tracks", x: 88, y: 0.75 },
  // across to the left over Schedule
  { at: "schedule", x: 80, y: 0.0 },
  { at: "schedule", x: 23, y: 0.2 },
  { at: "schedule", x: 23, y: 0.9 },
  // wandering over the FAQ, always heading down
  { at: "qna", x: 85, y: 0.25 },
  { at: "qna", x: 50, y: 0.55, loop: { r: 40, turn: 1 } },
  // to the left of Sponsors, ending in a heart
  { at: "sponsors", x: 14, y: 0.3 },
  { at: "sponsors", x: 14, y: 0.62, heart: { size: 70 } },
  { at: "sponsors", x: 14, y: 0.9 },
];

// The bee starts in the hero, at the invisible [data-bee-home] spot, then
// shrinks and glides onto the trail over the first `handoff` of a screen of
// scrolling (and back again when scrolling up). `angle` is how the bee art is
// rotated while it sits there.
export const HERO_BEE = { angle: 95.94, handoff: 0.55 };
