"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import leafAnt from "@/images/tracks_leaf1.png";
import leafLadybug from "@/images/tracks_leaf2.png";

const SIDE_SHIFT = "46.3%"; // how far side slides move (of slide width)
const SIDE_LIFT = "-3.8%"; // side slides sit slightly higher than the centre one

const arrowButtonClass =
  "text-black hover:text-gray-500 transition-colors focus:outline-none disabled:opacity-30 disabled:text-gray-300 disabled:hover:text-gray-300 disabled:cursor-not-allowed";

interface LeafCarouselProps<T> {
  /** id for the <section> */
  id: string;
  title: string;
  items: T[];
  getKey: (item: T, index: number) => string;
  /** what goes inside the white card for each item */
  renderCard: (item: T, index: number) => ReactNode;
  /** which leaf shows on the first slide */
  firstLeaf?: "ladybug" | "ant";
  /** disables both arrows */
  disabled?: boolean;
  /** used for the arrow labels */
  itemLabel?: string;
  /** white card width */
  cardWidth?: string;
  cardStyle?: CSSProperties;
}

const LeafCarousel = <T,>({
  id,
  title,
  items,
  getKey,
  renderCard,
  firstLeaf = "ladybug",
  disabled = false,
  itemLabel = "Item",
  cardWidth = "45%",
  cardStyle,
}: LeafCarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    if (disabled) return;
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    if (disabled) return;
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const getSlideStyle = (index: number): CSSProperties => {
    const total = items.length;
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

  const getLeaf = (index: number) => {
    const total = items.length;
    const isFirstType = ((total - index) % total) % 2 === 0;
    const useLadybug = firstLeaf === "ladybug" ? isFirstType : !isFirstType;
    return useLadybug ? leafLadybug : leafAnt;
  };

  return (
    <section
      id={id}
      className="relative flex min-h-[100svh] w-full items-center justify-center bg-[#e1edf5] overflow-hidden border-t-5 border-white"
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
          {title}
        </h2>

        {/* Slides */}
        {items.map((item, index) => (
          <div
            key={getKey(item, index)}
            className="absolute transition-all duration-500 ease-in-out"
            style={{
              left: "12.22%",
              top: "10.4%",
              width: "71.94%",
              ...getSlideStyle(index),
            }}
          >
            <Image
              src={getLeaf(index)}
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
                width: cardWidth,
                transform: "translate(-50%, -50%)",
                padding: "2.4cqw 2.6cqw",
                borderRadius: "2cqw",
                gap: "0.6cqw",
                ...cardStyle,
              }}
            >
              {renderCard(item, index)}
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
            className={arrowButtonClass}
            style={{ padding: "0.6cqw" }}
            aria-label={`Previous ${itemLabel}`}
            disabled={disabled}
          >
            <ArrowLeft
              strokeWidth={3}
              style={{ width: "3.05cqw", height: "3.05cqw" }}
            />
          </button>
          <button
            onClick={next}
            className={arrowButtonClass}
            style={{ padding: "0.6cqw" }}
            aria-label={`Next ${itemLabel}`}
            disabled={disabled}
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

export default LeafCarousel;
