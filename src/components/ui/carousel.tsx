"use client";

import { AnimatePresence, motion } from "motion/react";
import { reveal } from "@/components/scroll-motion";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import leafAnt from "@/images/tracks_leaf1.png";
import leafLadybug from "@/images/tracks_leaf2.png";

const SIDE_SHIFT = "46.3%"; // how far side slides move (of slide width)
const SIDE_LIFT = "-3.8%"; // side slides sit slightly higher than the centre one

// Phone slide transition; `dir` is +1 for next, -1 for previous
const mobileSlide = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: -dir * 60 }),
};

// Leaf width on phones. The leaf shape only fills ~29–77% of the image's
// height, so it's drawn wide (sides run off-screen) and the container is
// cropped to that band, with the card centred on the leaf's (57.5%, 52.7%).
const MOBILE_LEAF = "min(200vw, 900px)";

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
  /** hide the leaf/bug art (it still reserves the same space) */
  hideGraphics?: boolean;
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
  hideGraphics = false,
}: LeafCarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const touchX = useRef<number | null>(null);

  const next = () => {
    if (disabled) return;
    setDir(1);
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    if (disabled) return;
    setDir(-1);
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

  // Card sizing in --cu units: 1cqw on the desktop canvas, px on phones
  const cardBoxStyle: CSSProperties = {
    padding: "calc(var(--cu) * 2.4) calc(var(--cu) * 2.6)",
    borderRadius: "calc(var(--cu) * 2)",
    gap: "calc(var(--cu) * 0.6)",
  };

  return (
    <section
      id={id}
      className="relative flex w-full items-center justify-center overflow-hidden landscape:min-h-[100svh]"
    >
      {/* Desktop / landscape: fixed-ratio canvas */}
      <div
        className="relative shrink-0 [--cu:1cqw] portrait:hidden"
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
            left: "50%",
            top: "20.1%",
            fontSize: "5.35cqw",
            fontFamily: "var(--font-brand), sans-serif",
          }}
        >
          {title}
        </motion.h2>

        {/* Slides */}
        <motion.div {...reveal(0.15, 80)} className="absolute inset-0">
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
                className={`w-full h-auto pointer-events-none ${hideGraphics ? "invisible" : ""}`}
                priority={index < 2}
              />

              {/* White card */}
              <div
                className="absolute flex flex-col"
                style={{
                  left: "57.5%",
                  top: "52.7%",
                  width: cardWidth,
                  transform: "translate(-50%, -50%)",
                  ...cardBoxStyle,
                  ...cardStyle,
                }}
              >
                {renderCard(item, index)}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Arrows */}
        <motion.div
          {...reveal(0.3, 20)}
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
        </motion.div>
      </div>

      {/* Mobile / portrait: one leaf at a time, swipe or arrows */}
      <div className="relative flex w-full flex-col items-center gap-4 py-20 [--cu:9.4px] landscape:hidden">
        <motion.h2
          {...reveal()}
          className="section-title section-title-mobile relative z-20"
        >
          {title}
        </motion.h2>

        <motion.div
          {...reveal(0.15, 80)}
          className="relative w-full"
          style={{ height: `calc(${MOBILE_LEAF} * 0.433)` }}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (dx < -50) next();
            else if (dx > 50) prev();
          }}
        >
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={currentIndex}
              custom={dir}
              variants={mobileSlide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={getLeaf(currentIndex)}
                alt=""
                className={`pointer-events-none absolute h-auto max-w-none ${hideGraphics ? "invisible" : ""}`}
                style={{
                  width: MOBILE_LEAF,
                  top: `calc(${MOBILE_LEAF} * -0.259)`,
                  left: `calc(50% - ${MOBILE_LEAF} * 0.575)`,
                }}
              />
              <div
                className="absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col"
                style={{
                  top: "50%",
                  width: "min(78vw, 420px)",
                  ...cardBoxStyle,
                  ...cardStyle,
                }}
              >
                {renderCard(items[currentIndex], currentIndex)}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div {...reveal(0.3, 20)} className="flex gap-8">
          <button
            onClick={prev}
            className={`${arrowButtonClass} p-2`}
            aria-label={`Previous ${itemLabel}`}
            disabled={disabled}
          >
            <ArrowLeft strokeWidth={3} className="size-8" />
          </button>
          <button
            onClick={next}
            className={`${arrowButtonClass} p-2`}
            aria-label={`Next ${itemLabel}`}
            disabled={disabled}
          >
            <ArrowRight strokeWidth={3} className="size-8" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LeafCarousel;
