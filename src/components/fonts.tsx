import {
  Funnel_Display,
  Inconsolata,
  DM_Sans,
  Mochiy_Pop_One,
  Quicksand,
} from "next/font/google";
import localFont from "next/font/local";

const mochiy = Mochiy_Pop_One({
  variable: "--font-mochiy",
  weight: "400",
  subsets: ["latin"],
});

// Brand font candidates. Each has its own size-adjust because their letters
// sit at very different sizes for the same font-size.
const baksoSapi = localFont({
  src: "../fonts/BaksoSapi.otf",
  declarations: [{ prop: "size-adjust", value: "80%" }],
});

const lazyDog = localFont({
  src: "../fonts/LazyDog.ttf",
  declarations: [{ prop: "size-adjust", value: "115%" }],
});

export const brandFonts = { baksoSapi, lazyDog };

// Pick the site-wide font here; everything reads it through var(--font-brand)
export const brandFont = brandFonts.lazyDog; // or brandFonts.lazyDog

// Reading font candidates, for longer text people actually read (paragraphs,
// descriptions, answers). Paths keep the original file names (license terms).
const simplyRounded = localFont({
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

const timesNewRomance = localFont({
  src: [
    {
      path: "../fonts/times_new_romance2/Times New Romance-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/times_new_romance2/Times New Romance.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/times_new_romance2/Times New Romance-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/times_new_romance2/Times New Romance-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/times_new_romance2/Times New Romance-Bold-Italic.otf",
      weight: "700",
      style: "italic",
    },
  ],
});

// Free (OFL) rounded font with light weights, 300–700
const quicksand = Quicksand({ weight: "variable", subsets: ["latin"] });

export const readingFonts = { simplyRounded, timesNewRomance, quicksand };

// Pick the reading font here; readable text uses it via the .font-read class
// (.font-read asks for weight 300: Quicksand and Times New Romance have a
// light 300, Simply Rounded falls back to its Regular)
export const readingFont = readingFonts.simplyRounded; // or .quicksand / .timesNewRomance

const sans = DM_Sans({
  variable: "--font-sans",
  weight: "variable",
  subsets: ["latin"],
});

const mono = Inconsolata({
  variable: "--font-mono",
  weight: "variable",
  subsets: ["latin"],
});

const display = Funnel_Display({
  variable: "--font-display",
  weight: "variable",
  subsets: ["latin"],
});

export const fonts = {
  sans,
  mono,
  display,
  mochiy,
};
