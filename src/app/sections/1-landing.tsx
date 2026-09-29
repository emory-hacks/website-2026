"use client";

import { useState, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";
import Image from "next/image";
import logo from "@/images/logo_transparent.png";
import flowerPink from "@/images/home_flower1.png";
import flowerOrange from "@/images/home_flower2.png";
import bee1 from "@/images/home_bee1.png"; // cropped version (bee only, no transparent padding)
import bee2 from "@/images/home_bee2.png";

const DDAY = "2026-11-13T18:00:00";

const LandingSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="landing"
      className="relative flex min-h-[100svh] w-full items-center justify-center bg-[#f4f9fc] overflow-hidden"
    >
      <div
        className="relative shrink-0"
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
            left: "-5.382%",
            top: "36.72%",
            width: "38.05%",
            transform: "rotate(-17.49deg)",
          }}
        >
          <Image src={flowerPink} alt="" className="w-full h-auto" priority />
        </div>

        {/* Flower 2 */}
        <div
          className="pointer-events-none absolute z-0"
          style={{ left: "62.36%", top: "27.28%", width: "45.97%" }}
        >
          <Image src={flowerOrange} alt="" className="w-full h-auto" priority />
        </div>

        {/* Logo */}
        <div
          className="absolute z-10"
          style={{ left: "16.875%", top: "35.25%", width: "66.18%" }}
        >
          {/* The white glow backdrop */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-white blur-3xl rounded-[100%] opacity-90 z-0"></div>
          <Image
            src={logo}
            alt="Emory Hacks Logo"
            width={4718}
            height={1487}
            className="relative z-10 w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Bee 1 */}
        <div
          className="pointer-events-none absolute z-20"
          style={{
            left: "19.35%",
            top: "76.5%",
            width: "9.72%",
            transform: "rotate(95.94deg)",
          }}
        >
          <Image src={bee1} alt="" className="w-full h-auto" />
        </div>

        {/* Bee 2 */}
        <div
          className="pointer-events-none absolute z-20"
          style={{ left: "86.32%", top: "35.94%", width: "11.875%" }}
        >
          <Image src={bee2} alt="" className="w-full h-auto" />
        </div>

        {/* Date */}
        <p
          className="absolute z-20 text-gray-900 whitespace-nowrap leading-none"
          style={{
            left: "23.9%",
            top: "63.5%",
            fontSize: "1.806cqw",
            fontFamily: "'Mochiy Pop One', sans-serif",
          }}
        >
          Nov 13 - Nov 15
        </p>

        {/* Countdown Timer */}
        <div
          className="absolute z-20 flex flex-col items-center justify-center bg-[#dcf0a2]/70 rounded-sm backdrop-blur-md shadow-sm border border-[#9cc044]/30"
          style={{
            left: "63.82%",
            top: "62.5%",
            width: "13.26%",
            padding: "0.8cqw 0",
          }}
        >
          {isMounted ? (
            <Countdown
              date={new Date(DDAY)}
              intervalDelay={0}
              precision={3}
              renderer={({ days, hours, minutes, seconds }) => {
                return (
                  <>
                    <div
                      className="flex gap-2 font-bold font-mono text-gray-800 tracking-wider"
                      style={{ fontSize: "1.5cqw" }}
                    >
                      <span>{days}</span>
                      <span>
                        {zeroPad(hours, 2)}:{zeroPad(minutes, 2)}:
                        {zeroPad(seconds, 2)}
                      </span>
                    </div>
                    <div
                      className="flex w-full justify-between px-[8%] font-bold text-gray-600 mt-1"
                      style={{ fontSize: "0.9cqw" }}
                    >
                      <span>D</span>
                      <span>H</span>
                      <span>M</span>
                      <span>S</span>
                    </div>
                  </>
                );
              }}
            />
          ) : (
            <>
              <div
                className="flex gap-2 font-bold font-mono text-gray-800 tracking-wider"
                style={{ fontSize: "1.5cqw" }}
              >
                <span>-</span>
                <span>--:--:--</span>
              </div>
              <div
                className="flex w-full justify-between px-[8%] font-bold text-gray-600 mt-1"
                style={{ fontSize: "0.9cqw" }}
              >
                <span>D</span>
                <span>H</span>
                <span>M</span>
                <span>S</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
