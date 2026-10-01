"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import scheduleData from "@/lib/schedule.json";

const SCHEDULE_TBA = true;

const DAY_DATES: Record<string, string> = {
  Friday: "11/13",
  Saturday: "11/14",
  Sunday: "11/15",
};

const ROW_PX = 25;
const BLOCK_PX = 355;
const DESIGN_PX_PER_CQW = 14.4;
const getRowGap = (count: number) => {
  if (count <= 1) return "0cqw";
  const px = Math.max(
    8,
    Math.min(41, (BLOCK_PX - count * ROW_PX) / (count - 1)),
  );
  return `${(px / DESIGN_PX_PER_CQW).toFixed(3)}cqw`;
};

const formatTime = (time: string) => time.replace(/^0/, "");

const arrowClass =
  "absolute z-20 -translate-x-1/2 -translate-y-1/2 text-black hover:text-gray-500 transition-colors focus:outline-none disabled:opacity-30 disabled:text-gray-300 disabled:hover:text-gray-300 disabled:cursor-not-allowed";

const ScheduleSection = () => {
  const [dayIndex, setDayIndex] = useState(0);
  const activeDay = scheduleData[dayIndex];
  const dayDate = DAY_DATES[activeDay.day];

  const isFirstDay = dayIndex === 0;
  const isLastDay = dayIndex === scheduleData.length - 1;

  const goToPrevious = () => {
    if (!isFirstDay) {
      setDayIndex((prev) => prev - 1);
    }
  };

  const goToNext = () => {
    if (!isLastDay) {
      setDayIndex((prev) => prev + 1);
    }
  };

  return (
    <section
      id="schedule"
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
        {/* Title */}
        <h2
          className="absolute z-20 -translate-x-1/2 whitespace-nowrap leading-none text-neutral-900"
          style={{
            left: "50%",
            top: "20%",
            fontSize: "5.35cqw",
            fontFamily: "'Mochiy Pop One', sans-serif",
          }}
        >
          SCHEDULE
        </h2>

        {/* Previous arrow - centred ~83px left of the card */}
        <button
          onClick={goToPrevious}
          className={arrowClass}
          style={{ left: "26.53%", top: "56%", padding: "0.55cqw" }}
          aria-label="Previous day"
          disabled={isFirstDay}
        >
          <ArrowLeft
            strokeWidth={3}
            style={{ width: "2.78cqw", height: "2.78cqw" }}
          />
        </button>

        {/* Card */}
        <div
          className="absolute z-10 flex flex-col bg-white shadow-sm"
          style={{
            left: "32.29%",
            top: "35.06%",
            width: "35.35%",
            minHeight: "41.9%",
            borderRadius: "1.39cqw",
            gap: "1.39cqw",
            padding: "1.39cqw 2.78cqw",
          }}
        >
          {/* Date */}
          <p
            className="text-neutral-900"
            style={{
              fontFamily: "'Mochiy Pop One', sans-serif",
              fontWeight: 400,
              fontSize: "1.806cqw",
              lineHeight: 1,
              letterSpacing: 0,
            }}
          >
            {dayDate ? `${dayDate} (${activeDay.day})` : activeDay.day}
          </p>

          {SCHEDULE_TBA ? (
            <div className="flex flex-1 items-center justify-center">
              <p
                className="text-neutral-400"
                style={{
                  fontFamily: "'Mochiy Pop One', sans-serif",
                  fontWeight: 400,
                  fontSize: "2.78cqw",
                }}
              >
                TBA
              </p>
            </div>
          ) : (
            /* Times & events + vertical line */
            <div
              className="flex flex-col border-l border-black"
              style={{
                width: "27.6cqw",
                gap: getRowGap(activeDay.events.length),
                padding: "0 2.78cqw",
                marginLeft: "2.78cqw",
              }}
            >
              {activeDay.events.map((event, i) => (
                <div
                  key={`${activeDay.day}-${i}-${event.time}`}
                  className="grid items-center"
                  style={{
                    gridTemplateColumns: "11.1cqw 1fr",
                    fontSize: "1.39cqw",
                    lineHeight: 1.25,
                  }}
                >
                  <span className="font-semibold text-neutral-800">
                    {formatTime(event.time)}
                  </span>
                  <span className="text-neutral-700">{event.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Next arrow */}
        <button
          onClick={goToNext}
          className={arrowClass}
          style={{ left: "73.4%", top: "56%", padding: "0.55cqw" }}
          aria-label="Next day"
          disabled={isLastDay}
        >
          <ArrowRight
            strokeWidth={3}
            style={{ width: "2.78cqw", height: "2.78cqw" }}
          />
        </button>
      </div>
    </section>
  );
};

export default ScheduleSection;
