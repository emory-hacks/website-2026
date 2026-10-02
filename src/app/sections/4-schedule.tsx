"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { reveal } from "@/components/scroll-motion";
import scheduleData from "@/lib/schedule.json";
import SkyGlow from "@/components/sky-glow";
import { Blossom, Leaf } from "@/components/garden";

const SCHEDULE_TBA = false;

const DAYS: Record<string, { short: string; date: string }> = {
  Friday: { short: "fri", date: "11/13" },
  Saturday: { short: "sat", date: "11/14" },
  Sunday: { short: "sun", date: "11/15" },
};

// Seconds per row: the vine grows one row per step as bullets pop in
const ROW_STEP = 0.12;

// Shared by the visible rows and the invisible height-reserving copies
const ROW_CLASS =
  "grid grid-cols-[6.5rem_1.75rem_1fr] items-center gap-x-3 py-3 md:grid-cols-[11rem_2.25rem_1fr] md:gap-x-5 md:py-4";
const TIME_CLASS =
  "text-right text-[18px] tracking-wide text-[#e46f4f] md:text-[26px]";
const EVENT_CLASS =
  "text-[20px] leading-snug tracking-wide text-[#4a2a14] md:text-[29px]";

const formatTime = (time: string) => time.replace(/^0/, "");

const ScheduleSection = () => {
  const [dayIndex, setDayIndex] = useState(0);
  const activeDay = scheduleData[dayIndex];

  // Hold the vine animation until the timeline scrolls into view
  const timelineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(timelineRef, { once: true, amount: 0.2 });

  return (
    <section
      id="schedule"
      className="relative flex w-full flex-col items-center overflow-x-clip px-5 py-20 landscape:min-h-[100svh] landscape:py-28"
    >
      <motion.h2
        {...reveal()}
        className="section-title section-title-mobile relative z-20 landscape:text-[clamp(44px,5.35vw,64px)]"
      >
        schedule
      </motion.h2>

      {/* Day tabs */}
      <motion.div
        {...reveal(0.1, 20)}
        className="relative z-20 mt-8 flex gap-2 md:gap-4"
        role="tablist"
      >
        {scheduleData.map(({ day }, i) => {
          const active = i === dayIndex;
          return (
            <button
              key={day}
              role="tab"
              aria-selected={active}
              onClick={() => setDayIndex(i)}
              className={`relative rounded-full px-4 py-2 text-[19px] tracking-wide transition-colors md:px-6 md:text-[26px] ${
                active
                  ? "text-[#e46f4f]"
                  : "text-[#4a2a14] hover:text-[#4a2a14]/50"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="schedule-day"
                  className="absolute inset-0"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">
                {DAYS[day]?.short ?? day} {DAYS[day]?.date}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Timeline */}
      <motion.div
        {...reveal(0.2, 40)}
        className="relative mt-10 w-full max-w-3xl"
      >
        <SkyGlow opacity={0.35} />

        {SCHEDULE_TBA ? (
          <p className="relative py-16 text-center text-[36px] text-[#4a2a14]/50">
            tba
          </p>
        ) : (
          <div ref={timelineRef} className="relative grid">
            {/* Every day's list sits invisibly in the same grid cell, so the
                timeline is always as tall as the longest day: switching days
                never changes the page height (which would shift everything
                below, including the bee trail) */}
            {scheduleData.map((day) => (
              <ol
                key={day.day}
                className="invisible col-start-1 row-start-1"
                aria-hidden
              >
                {day.events.map((event, i) => (
                  <li key={i} className={ROW_CLASS}>
                    <span className={TIME_CLASS}>{formatTime(event.time)}</span>
                    <span className="size-7 md:size-9" />
                    <span className={EVENT_CLASS}>{event.description}</span>
                  </li>
                ))}
              </ol>
            ))}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay.day}
                className="relative col-start-1 row-start-1 self-start"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                {/* The vine grows down; each row's bullet pops as it passes */}
                <motion.div
                  className="absolute bottom-3 top-3 w-[3px] origin-top rounded-full bg-[#8fbf4d] left-[calc(8.125rem-1.5px)] md:left-[calc(13.375rem-1.5px)]"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: inView ? 1 : 0 }}
                  transition={{
                    duration: activeDay.events.length * ROW_STEP,
                    ease: "linear",
                  }}
                  aria-hidden
                />

                <motion.ol
                  initial="hidden"
                  animate={inView ? "shown" : "hidden"}
                  variants={{
                    hidden: {},
                    shown: {
                      transition: {
                        staggerChildren: ROW_STEP,
                        delayChildren: ROW_STEP / 2,
                      },
                    },
                  }}
                >
                  {activeDay.events.map((event, i) => (
                    <motion.li
                      key={`${activeDay.day}-${i}`}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        shown: { opacity: 1, x: 0 },
                      }}
                      className={ROW_CLASS}
                    >
                      <span className={TIME_CLASS}>
                        {formatTime(event.time)}
                      </span>
                      <motion.span
                        className="relative flex justify-center"
                        variants={{
                          hidden: { scale: 0, rotate: -30 },
                          shown: {
                            scale: 1,
                            rotate: 0,
                            transition: {
                              type: "spring",
                              stiffness: 500,
                              damping: 14,
                            },
                          },
                        }}
                      >
                        {i % 2 === 0 ? (
                          <Leaf
                            flip={i % 4 === 2}
                            className="size-7 md:size-9"
                          />
                        ) : (
                          <Blossom className="size-7 md:size-9" />
                        )}
                      </motion.span>
                      <span className={EVENT_CLASS}>{event.description}</span>
                    </motion.li>
                  ))}
                </motion.ol>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default ScheduleSection;
