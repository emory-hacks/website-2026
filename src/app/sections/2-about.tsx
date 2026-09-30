"use client";

import Image from "next/image";
import flower1 from "@/images/about_flower1.png";
import flower3 from "@/images/about_flower3.png";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex min-h-[100svh] w-full items-center justify-center bg-[#d7edfa] overflow-hidden border-t-5 border-white"
    >
      <div
        className="relative shrink-0"
        style={{
          width: "min(100%, calc(100svh * 1440 / 1081))",
          aspectRatio: "1440 / 1081",
          containerType: "inline-size",
        }}
      >
        {/* Flower 1 */}
        <div
          className="pointer-events-none absolute z-0"
          style={{ left: "17.09%", top: "48.57%", width: "20.75%" }}
        >
          <Image src={flower1} alt="" className="w-full h-auto" />
        </div>

        {/* Flower 3 */}
        <div
          className="pointer-events-none absolute z-0"
          style={{
            left: "68.53%",
            top: "48.17%",
            width: "10.9%",
            transform: "rotate(20.92deg)",
          }}
        >
          <Image src={flower3} alt="" className="w-full h-auto" />
        </div>

        {/* Title */}
        <h2
          className="absolute z-20 -translate-x-1/2 whitespace-nowrap leading-none text-black"
          style={{
            left: "51.3%",
            top: "23.6%",
            fontSize: "5.35cqw",
            fontFamily: "'Mochiy Pop One', sans-serif",
          }}
        >
          ABOUT
        </h2>

        {/* Card */}
        <div
          className="absolute z-10 flex flex-col items-center bg-white/80 backdrop-blur-md shadow-xl border border-white/40"
          style={{
            left: "29.79%",
            top: "33.77%",
            width: "43.06%",
            borderRadius: "2.083cqw",
            padding: "4.167cqw",
            gap: "0.694cqw",
          }}
        >
          <p
            className="text-center text-gray-900 font-medium"
            style={{ fontSize: "1.39cqw", lineHeight: 2 }}
          >
            Emory Hacks, presented by PROJECT Emory, is a hackathon hosted at
            Emory University. We are committed to bringing hundreds of students
            together for an intensive 36-hour hackathon where innovation comes
            to life. Whether you're a first-time coder or a seasoned developer
            come bond peers and industry professionals, and join us to push your
            creative and technical boundaries in this dynamic weekend of
            building and collaboration.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
