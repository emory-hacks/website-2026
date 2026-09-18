"use client";

import { useState, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";
import Image from "next/image";
import logo from "@/images/logo_transparent.png";

const DDAY = "2026-11-13T18:00:00";

const LandingSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="landing"
      className="relative min-h-screen w-full bg-[#f4f9fc] flex items-center justify-center overflow-hidden"
    >
      {/* Left Green Graphic Placeholder */}
      <div className="absolute left-0 bottom-[0%] w-[40vw] md:w-[35vw] h-[60vh] bg-[#9cc044]"></div>

      {/* Right Green Graphic Placeholder */}
      <div className="absolute right-[0%] bottom-[0%] w-[40vw] md:w-[35vw] h-[80vh] bg-[#9cc044]"></div>

      {/* Center Content Wrapper - Forces a column layout */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center -mt-20">
        {/* Inner Wrapper - Controls the width of the logo and the elements below it */}
        <div className="relative flex flex-col items-center justify-center w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%]">
          {/* Logo Container */}
          <div className="relative flex w-full items-center justify-center">
            {/* The white glow backdrop */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-white blur-3xl rounded-[100%] opacity-90 z-0"></div>

            {/* The actual logo */}
            <Image
              src={logo}
              alt="Emory Hacks Logo"
              width={4718}
              height={1487}
              className="relative z-10 w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Date & Timer Flex Row - Aligns them horizontally across from each other */}
          <div className="relative z-10 flex w-full justify-between items-center mt-2 px-4 md:px-8">
            {/* Date Text with 5% left padding and Mochiy Pop One font */}
            <p
              className="text-xl md:text-2xl text-gray-900 pl-[5%]"
              style={{ fontFamily: "'Mochiy Pop One', sans-serif" }}
            >
              Nov 13 - Nov 15
            </p>

            {/* Countdown Timer */}
            <div className="inline-flex flex-col items-center justify-center bg-[#dcf0a2]/70 px-5 py-2 rounded-sm backdrop-blur-md shadow-sm border border-[#9cc044]/30">
              {isMounted ? (
                <Countdown
                  date={new Date(DDAY)}
                  intervalDelay={0}
                  precision={3}
                  renderer={({ days, hours, minutes, seconds }) => {
                    return (
                      <>
                        <div className="flex gap-2 text-lg md:text-xl font-bold font-mono text-gray-800 tracking-wider">
                          <span>{days}</span>
                          <span>
                            {zeroPad(hours, 2)}:{zeroPad(minutes, 2)}:
                            {zeroPad(seconds, 2)}
                          </span>
                        </div>
                        <div className="flex w-full justify-between px-2 text-[10px] md:text-xs font-bold text-gray-600 mt-1">
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
                  <div className="flex gap-2 text-lg md:text-xl font-bold font-mono text-gray-800 tracking-wider">
                    <span>-</span>
                    <span>--:--:--</span>
                  </div>
                  <div className="flex w-full justify-between px-2 text-[10px] md:text-xs font-bold text-gray-600 mt-1">
                    <span>D</span>
                    <span>H</span>
                    <span>M</span>
                    <span>S</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
