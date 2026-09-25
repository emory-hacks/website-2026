import {
  Funnel_Display,
  Inconsolata,
  DM_Sans,
  Mochiy_Pop_One,
} from "next/font/google";

const mochiy = Mochiy_Pop_One({
  variable: "--font-mochiy",
  weight: "400",
  subsets: ["latin"],
});

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
