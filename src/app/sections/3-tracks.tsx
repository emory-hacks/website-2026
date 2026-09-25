"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

const TracksSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTrack = () => {
    setCurrentIndex((prev) => (prev === trackData.length - 1 ? 0 : prev + 1));
  };

  const prevTrack = () => {
    setCurrentIndex((prev) => (prev === 0 ? trackData.length - 1 : prev - 1));
  };

  const getCardStyle = (index: number) => {
    const total = trackData.length;
    const offset = (index - currentIndex + total) % total;

    // Cards
    if (offset === 0) {
      return "left-1/2 -translate-x-1/2 scale-100 z-30 opacity-100 shadow-xl bg-[#9cc044]";
    }
    if (offset === 1) {
      return "left-[70%] md:left-[72%] -translate-x-1/2 scale-90 z-20 opacity-60 shadow-md bg-[#b5d365]";
    }
    if (offset === total - 1) {
      return "left-[30%] md:left-[28%] -translate-x-1/2 scale-90 z-20 opacity-60 shadow-md bg-[#b5d365]";
    }
    return "left-1/2 -translate-x-1/2 scale-75 -translate-y-8 z-10 opacity-30 bg-[#cce393]";
  };

  return (
    <section
      id="tracks"
      className="relative min-h-screen w-full bg-[#f4f9fc] flex flex-col items-center justify-center overflow-hidden py-20"
    >
      <h2
        className="text-5xl md:text-7xl text-black mb-16 z-20"
        style={{ fontFamily: "'Mochiy Pop One', sans-serif" }}
      >
        TRACKS
      </h2>

      <div className="relative w-full max-w-5xl h-[400px] flex items-center justify-center mb-8">
        {trackData.map((track, index) => (
          <div
            key={track.id}
            className={`absolute transition-all duration-500 ease-in-out w-[400px] md:w-[590px] h-[350px] p-8 flex flex-col justify-center rounded-sm ${getCardStyle(
              index,
            )}`}
          >
            <h3
              className="text-3xl font-black text-black mb-4"
              style={{
                fontFamily: "'Mochiy Pop One', sans-serif",
                fontWeight: "400",
              }}
            >
              {track.title}
            </h3>
            <p className="text-black font-medium leading-relaxed">
              {track.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-8 z-40">
        <button
          onClick={prevTrack}
          className="p-2 text-black hover:text-gray-500 transition-colors focus:outline-none"
          aria-label="Previous Track"
        >
          <ArrowLeft size={40} strokeWidth={3} />
        </button>
        <button
          onClick={nextTrack}
          className="p-2 text-black hover:text-gray-500 transition-colors focus:outline-none"
          aria-label="Next Track"
        >
          <ArrowRight size={40} strokeWidth={3} />
        </button>
      </div>
    </section>
  );
};

export default TracksSection;
