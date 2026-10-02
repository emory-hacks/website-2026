import { brandFont, fonts, readingFont } from "@/components/fonts";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Clouds from "@/components/clouds";
import Sparkles from "@/components/sparkles";
import OverscrollColor from "@/components/overscroll-color";
import MotionProvider from "@/components/motion-provider";
import type { Metadata } from "next";
import "./globals.css";

const fontVariables = Object.entries(fonts)
  .map(([, v]) => v.variable)
  .join(" ");

const TITLE = "Emory Hacks" as const;
const DESCRIPTION =
  "Join us for Emory Hacks, a 36-hour hackathon at Emory University where innovation comes to life.";
const KEYWORDS = [
  "emory hacks",
  "hackathon",
  "emory university",
  "coding",
  "programming",
  "innovation",
  "emory hackathon",
  "atlanta",
  "emory university",
  "emory",
  "mlh",
  "major league hacking",
  "software",
  "contest",
  "competition",
  "atlanta hackathon",
  "atl hackathon",
  "atlanta coding",
  "computer science",
  "atlanta",
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.emoryhacks.com",
    siteName: TITLE,
    images: [
      {
        url: "https://www.emoryhacks.com/logo.png",
        width: 800,
        height: 800,
        alt: "Emory Hacks",
      },
    ],
    locale: "en_us",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${fontVariables} relative font-sans antialiased overflow-x-hidden`}
        style={
          {
            "--font-brand": brandFont.style.fontFamily,
            "--font-read": readingFont.style.fontFamily,
          } as React.CSSProperties
        }
      >
        <MotionProvider>
          <OverscrollColor />
          <Clouds />
          <Sparkles />
          <Nav />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
