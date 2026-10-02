import localFont from "next/font/local";

// Site-wide brand font; everything reads it through var(--font-brand).
// size-adjust scales the glyphs since LazyDog renders small for its font-size.
export const brandFont = localFont({
  src: "../fonts/LazyDog.ttf",
  declarations: [{ prop: "size-adjust", value: "115%" }],
});

// Reading font for longer text (paragraphs, descriptions, answers); used via
// the .font-read class. Paths keep the original file names (license terms).
export const readingFont = localFont({
  src: [
    {
      path: "../fonts/simply_rounded/Simply Rounded-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/simply_rounded/Simply Rounded-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
});
