"use client";

import { useState, useEffect, useRef } from "react";
import Countdown, { zeroPad } from "react-countdown";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Enter from "@/components/enter";
import logo from "@/images/logo_transparent.png";
import flowerPink from "@/images/rendered-flower2.webp";
import flowerOrange from "@/images/rendered-flower.webp";
import bee1 from "@/images/rendered-bee.webp"; // cropped version (bee only, no transparent padding)

// Eastern time: Nov 13 is after daylight saving ends, so EST (UTC-5)
const DDAY = "2026-11-13T16:00:00-05:00";
const BRAND_FONT = "var(--font-brand), sans-serif";
const LABELS = ["Days", "Hours", "Mins", "Secs"];

// Hero entrance timeline, in seconds
const T = {
  flowerPink: 0.2,
  flowerOrange: 0.35,
  logo: 0.6,
  date: 1.0,
  countdown: 1.15,
  bee: 1.5,
};

const CountdownUnits = ({ values }: { values: string[] }) => (
  <>
    {values.map((value, i) => (
      <motion.div
        key={LABELS[i]}
        className="flex items-start"
        style={{ gap: "calc(var(--u) * 1.2)" }}
        initial={{ opacity: 0, y: 24, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: T.countdown + i * 0.12,
          type: "spring",
          stiffness: 140,
          damping: 12,
        }}
      >
        {i > 0 && (
          <span
            className="leading-none text-[#e46f4f]"
            style={{
              fontSize: "calc(var(--u) * 3.6)",
              paddingTop: "calc(var(--u) * 1.7)",
              fontFamily: BRAND_FONT,
              WebkitTextStroke: "calc(var(--u) * 0.12) currentColor",
            }}
          >
            :
          </span>
        )}
        <div
          className="flex flex-col items-center"
          style={{ gap: "calc(var(--u) * 0.6)" }}
        >
          <div
            className="flex items-center justify-center rounded-[calc(var(--u)*1.4)] bg-[#fffbe3] tabular-nums leading-none text-[#5d8a2e]"
            style={{
              width: "calc(var(--u) * 8)",
              height: "calc(var(--u) * 6.6)",
              fontSize: "calc(var(--u) * 3.6)",
              border: "calc(var(--u) * 0.2) solid #8fbf4d",
              boxShadow: "0 calc(var(--u) * 0.4) 0 #8fbf4d",
              paddingTop: "calc(var(--u) * 0.8)",
              paddingLeft: "calc(var(--u) * 0.4)",
              letterSpacing: "0.15em",
              fontFamily: BRAND_FONT,
              WebkitTextStroke: "calc(var(--u) * 0.12) currentColor",
            }}
          >
            <motion.span
              key={value}
              initial={{ scale: 1.03, opacity: 0.9 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {value}
            </motion.span>
          </div>
          <span
            className="uppercase leading-none text-[#5d8a2e]"
            style={{
              fontSize: "calc(var(--u) * 1.1)",
              letterSpacing: "0.08em",
              fontFamily: BRAND_FONT,
              WebkitTextStroke: "calc(var(--u) * 0.04) currentColor",
            }}
          >
            {LABELS[i]}
          </span>
        </div>
      </motion.div>
    ))}
  </>
);

// Sizes are in --u units: 1cqw on the desktop canvas, scaled up from vw on mobile
const DatePill = ({ className = "" }: { className?: string }) => (
  <div className={className}>
    <Enter from={{ y: -24 }} delay={T.date}>
      <div
        className={`whitespace-nowrap rounded-full bg-[#fffbe3] leading-none text-[#e46f4f] shadow-sm`}
        style={{
          fontSize: "calc(var(--u) * 1.5)",
          padding:
            "calc(var(--u) * 0.9) calc(var(--u) * 1.8) calc(var(--u) * 0.7)",
          fontFamily: BRAND_FONT,
          WebkitTextStroke: "calc(var(--u) * 0.08) currentColor",
          border: "calc(var(--u) * 0.2) solid #e46f4f",
        }}
      >
        Nov 13 - 15 2026
      </div>
    </Enter>
  </div>
);

const CountdownTimer = ({
  isMounted,
  className = "",
  style,
}: {
  isMounted: boolean;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`flex items-start ${className}`}
    style={{ gap: "calc(var(--u) * 1.2)", ...style }}
  >
    {isMounted ? (
      <Countdown
        date={new Date(DDAY)}
        renderer={({ days, hours, minutes, seconds }) => (
          <CountdownUnits
            values={[
              zeroPad(days, 2),
              zeroPad(hours, 2),
              zeroPad(minutes, 2),
              zeroPad(seconds, 2),
            ]}
          />
        )}
      />
    ) : (
      <CountdownUnits values={["--", "--", "--", "--"]} />
    )}
  </div>
);

const LogoWithGlow = ({
  glowBlur,
  glowOpacity = 1,
}: {
  glowBlur: string;
  glowOpacity?: number;
}) => (
  <>
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[100%] z-0"
      style={{
        width: "85%",
        height: "80%",
        background: "#fffbe3",
        filter: `blur(${glowBlur})`,
        opacity: glowOpacity,
      }}
    ></div>
    <Image
      src={logo}
      alt="Emory Hacks Logo"
      width={4718}
      height={1487}
      className="relative z-10 w-full h-auto object-contain"
      priority
    />
  </>
);

const PinkFlower = () => (
  <Enter from={{ x: "-18%", y: "12%", scale: 0.85 }} delay={T.flowerPink}>
    <div className="animate-sway origin-bottom-right">
      <Image src={flowerPink} alt="" className="w-full h-auto" priority />
    </div>
  </Enter>
);

const OrangeFlower = () => (
  <Enter from={{ x: "18%", y: "-12%", scale: 0.85 }} delay={T.flowerOrange}>
    <div
      className="animate-sway origin-bottom-left"
      style={{ animationDelay: "-3.5s" }}
    >
      <Image src={flowerOrange} alt="" className="w-full h-auto" priority />
    </div>
  </Enter>
);

const Logo = ({
  glowBlur,
  glowOpacity,
}: {
  glowBlur: string;
  glowOpacity?: number;
}) => (
  <Enter from={{ scale: 0.6 }} delay={T.logo}>
    <LogoWithGlow glowBlur={glowBlur} glowOpacity={glowOpacity} />
  </Enter>
);

// Flies in from the bottom-left, then bobs in place
// The bee's "home" in the hero. It's invisible: the page's one bee (in
// BeeTrail) sits exactly here at the top of the page, at this size and angle,
// and peels off onto the trail as you scroll (see HERO_BEE in bee-path.ts).

const Bee = () => (
  <div data-bee-home className="invisible">
    <Image src={bee1} alt="" className="w-full h-auto" />
  </div>
);

const LandingSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Scrolling away from the hero: flowers spread outward, centre rises
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const pinkX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const pinkY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const orangeX = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const orangeY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const centerY = useTransform(scrollYProgress, [0, 1], ["0svh", "-12svh"]);
  const beeY = useTransform(scrollYProgress, [0, 1], ["0svh", "-18svh"]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="landing"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* Desktop / landscape: fixed-ratio canvas */}
      <div
        className="relative shrink-0 [--u:1cqw] portrait:hidden"
        style={{
          width: "min(100%, calc(100svh * 1440 / 1024))",
          aspectRatio: "1440 / 1024",
          containerType: "inline-size",
          transform: "translateY(-6%)",
        }}
      >
        {/* Flower 1 */}
        <div
          className="pointer-events-none absolute z-0"
          style={{
            left: "-3.5%",
            top: "31.5%",
            width: "46%",
            transform: "rotate(-17.49deg)",
          }}
        >
          <motion.div style={{ x: pinkX, y: pinkY }}>
            <PinkFlower />
          </motion.div>
        </div>

        {/* Flower 2 */}
        <div
          className="pointer-events-none absolute z-0"
          style={{ left: "59.36%", top: "23.28%", width: "45.97%" }}
        >
          <motion.div style={{ x: orangeX, y: orangeY }}>
            <OrangeFlower />
          </motion.div>
        </div>

        {/* Logo */}
        <div
          className="absolute z-10"
          style={{
            left: "16.875%",
            top: "35.25%",
            width: "66.18%",
            transform: "scale(1.2)",
          }}
        >
          <motion.div style={{ y: centerY }}>
            <Logo glowBlur="3.5cqw" />
          </motion.div>
        </div>

        {/* Bee 1 */}
        <div
          className="pointer-events-none absolute z-20"
          style={{
            left: "17%",
            top: "71%",
            width: "8%",
          }}
        >
          <motion.div style={{ y: beeY }}>
            <Bee />
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-20"
          style={{ y: centerY }}
        >
          <DatePill className="absolute left-1/2 top-[29%] -translate-x-1/2" />

          <CountdownTimer
            isMounted={isMounted}
            className="absolute -translate-x-1/2"
            style={{ left: "50%", top: "67.5%" }}
          />
        </motion.div>
      </div>

      {/* Mobile / portrait: stacked layout */}
      <div className="relative flex min-h-[100svh] w-full flex-col items-center justify-center gap-[7vw] px-4 pb-[10svh] pt-[10svh] [--u:2vw] landscape:hidden">
        {/* Flower 2 */}
        <div
          className="pointer-events-none absolute z-0"
          style={{ right: "-25vw", top: "8svh", width: "78vw" }}
        >
          <motion.div style={{ x: orangeX, y: orangeY }}>
            <OrangeFlower />
          </motion.div>
        </div>

        {/* Flower 1 */}
        <div
          className="pointer-events-none absolute z-0"
          style={{
            left: "-38vw",
            bottom: "1svh",
            width: "96vw",
            transform: "rotate(-17.49deg)",
          }}
        >
          <motion.div style={{ x: pinkX, y: pinkY }}>
            <PinkFlower />
          </motion.div>
        </div>

        {/* Bee 1 */}
        <div
          className="pointer-events-none absolute z-20"
          style={{
            left: "20vw",
            bottom: "14svh",
            width: "13vw",
          }}
        >
          <motion.div style={{ y: beeY }}>
            <Bee />
          </motion.div>
        </div>

        <motion.div
          className="relative z-20 flex flex-col items-center gap-[7vw]"
          style={{ y: centerY }}
        >
          <DatePill className="[--u:2.6vw]" />

          <div className="w-[94vw]">
            <Logo glowBlur="10vw" glowOpacity={0.55} />
          </div>

          <CountdownTimer isMounted={isMounted} />
        </motion.div>
      </div>
    </section>
  );
};

export default LandingSection;
