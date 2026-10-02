"use client";

import { motion } from "motion/react";
import { reveal } from "@/components/scroll-motion";

import FlowerTitle from "@/components/flower-title";
import SkyGlow from "@/components/sky-glow";
import flower1 from "@/images/about_flower1.png";
import flower3 from "@/images/about_flower3.png";

const ABOUT_TEXT =
  "Emory Hacks, presented by PROJECT Emory, is a hackathon hosted at Emory University. We are committed to bringing hundreds of students together for an intensive 36-hour hackathon where innovation comes to life. Whether you're a first-time coder or a seasoned developer, come bond with peers and industry professionals, and join us to push your creative and technical boundaries in this dynamic weekend of building and collaboration!";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex w-full items-center justify-center overflow-x-clip landscape:min-h-[100svh]"
    >
      {/* Desktop / landscape: fixed-ratio canvas */}
      <div
        className="relative shrink-0 portrait:hidden"
        style={{
          width: "min(100%, calc(100svh * 1440 / 1081))",
          aspectRatio: "1440 / 1081",
          containerType: "inline-size",
        }}
      >
        {/* Title */}
        <motion.h2
          {...reveal()}
          className="section-title absolute z-20 -translate-x-1/2 whitespace-nowrap leading-none"
          style={{
            left: "51.3%",
            top: "23.6%",
            fontSize: "5.35cqw",
            fontFamily: "var(--font-brand), sans-serif",
          }}
        >
          <FlowerTitle left={flower1} right={flower3}>
            about
          </FlowerTitle>
        </motion.h2>

        {/* Text straight on the sky */}
        <motion.div
          {...reveal(0.15, 60)}
          className="absolute z-10"
          style={{ left: "24.32%", top: "35%", width: "54%" }}
        >
          <SkyGlow />
          <p
            className="font-read relative text-center text-[#4a2a14] tracking-wide"
            style={{ fontSize: "2cqw", lineHeight: 1.65 }}
          >
            {ABOUT_TEXT}
          </p>
        </motion.div>
      </div>

      {/* Mobile / portrait: stacked layout */}
      <div className="relative flex w-full flex-col items-center gap-8 px-5 py-28 landscape:hidden">
        <motion.h2
          {...reveal()}
          className="section-title section-title-mobile relative z-20"
        >
          <FlowerTitle left={flower1} right={flower3}>
            about
          </FlowerTitle>
        </motion.h2>

        <motion.div
          {...reveal(0.15, 60)}
          className="relative z-10 w-full max-w-xl px-2"
        >
          <SkyGlow />
          <p className="font-read relative text-center text-[19px] leading-[1.7] tracking-wide text-[#4a2a14]">
            {ABOUT_TEXT}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
