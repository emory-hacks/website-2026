"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import leafAnt from "@/images/tracks_leaf1.png";
import leafLadybug from "@/images/tracks_leaf2.png";

const trackData = [
  {
    id: 1,
    title: "Healthcare",
    desc: "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
  {
    id: 2,
    title: "Environment",
    desc: "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
  {
    id: 3,
    title: "Education",
    desc: "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
  {
    id: 4,
    title: "Finance",
    desc: "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
];

const SIDE_SHIFT = "46.3%"; // how far side slides move
const SIDE_LIFT = "-3.8%"; // side slides sit slightly higher than the center one

const TracksSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev === trackData.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? trackData.length - 1 : prev - 1));
  };

  const getSlideStyle = (index: number): React.CSSProperties => {
    const total = trackData.length;
    const offset = (index - currentIndex + total) % total;

    if (offset === 0) {
      return {
        transform: "translate(0, 0) scale(1)",
        opacity: 1,
        zIndex: 30,
      };
    }
    if (offset === 1) {
      return {
        transform: `translate(${SIDE_SHIFT}, ${SIDE_LIFT}) scale(0.9)`,
        opacity: 0.5,
        zIndex: 20,
      };
    }
    if (offset === total - 1) {
      return {
        transform: `translate(-${SIDE_SHIFT}, ${SIDE_LIFT}) scale(0.9)`,
        opacity: 0.5,
        zIndex: 20,
      };
    }
    return {
      transform: `translate(0, ${SIDE_LIFT}) scale(0.75)`,
      opacity: 0,
      zIndex: 10,
      pointerEvents: "none",
    };
  };

  return (
    <section
      id="tracks"
      className="relative flex min-h-[100svh] w-full items-center justify-center bg-[#f4f9fc] overflow-hidden"
    >
      <div
        className="relative shrink-0"
        style={{
          width: "min(100%, calc(100svh * 1440 / 1081))",
          aspectRatio: "1440 / 1081",
          containerType: "inline-size",
        }}
      >
        {/* Title */}
        <h2
          className="absolute z-20 -translate-x-1/2 whitespace-nowrap leading-none text-black"
          style={{
            left: "50%",
            top: "20.1%",
            fontSize: "5.35cqw",
            fontFamily: "'Mochiy Pop One', sans-serif",
          }}
        >
          TRACKS
        </h2>

        {/* Slides */}
        {trackData.map((item, index) => (
          <div
            key={item.id}
            className="absolute transition-all duration-500 ease-in-out"
            style={{
              left: "12.22%",
              top: "10.4%",
              width: "71.94%",
              ...getSlideStyle(index),
            }}
          >
            <Image
              src={index % 2 === 0 ? leafLadybug : leafAnt}
              alt=""
              className="w-full h-auto pointer-events-none"
              priority={index < 2}
            />

            {/* White card */}
            <div
              className="absolute flex flex-col bg-white/80 backdrop-blur-sm shadow-lg border border-white/50"
              style={{
                left: "57.5%",
                top: "52.7%",
                width: "41.5%",
                transform: "translate(-50%, -50%)",
                padding: "2.4cqw 2.6cqw",
                borderRadius: "2cqw",
                gap: "0.6cqw",
              }}
            >
              <h3
                className="text-black leading-tight"
                style={{
                  fontSize: "2.2cqw",
                  fontFamily: "'Mochiy Pop One', sans-serif",
                  fontWeight: 400,
                }}
              >
                {item.title}
              </h3>
              <p
                className="text-black font-medium"
                style={{ fontSize: "1.32cqw", lineHeight: 1.35 }}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <div
          className="absolute z-40 flex -translate-x-1/2 -translate-y-1/2"
          style={{ left: "50%", top: "81.3%", gap: "1.9cqw" }}
        >
          <button
            onClick={prev}
            className="text-black hover:text-gray-500 transition-colors focus:outline-none"
            style={{ padding: "0.6cqw" }}
            aria-label="Previous Track"
          >
            <ArrowLeft
              strokeWidth={3}
              style={{ width: "3.05cqw", height: "3.05cqw" }}
            />
          </button>
          <button
            onClick={next}
            className="text-black hover:text-gray-500 transition-colors focus:outline-none"
            style={{ padding: "0.6cqw" }}
            aria-label="Next Track"
          >
            <ArrowRight
              strokeWidth={3}
              style={{ width: "3.05cqw", height: "3.05cqw" }}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TracksSection;
