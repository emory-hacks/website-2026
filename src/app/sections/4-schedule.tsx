"use client";

import { Fragment, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ScheduleEvent {
  time: string;
  title: string;
}

interface ScheduleDay {
  date: string;
  day: string;
  events: ScheduleEvent[];
}

// TODO: CALL SCHEDULE API FOR DATA
const SCHEDULE: ScheduleDay[] = [
  {
    date: "11/13",
    day: "Friday",
    events: [
      { time: "5:00 PM", title: "Event 1" },
      { time: "6:00 PM", title: "Event 2" },
      { time: "7:00 PM", title: "Event 3" },
      { time: "8:00 PM", title: "Event 4" },
      { time: "10:00 PM", title: "Event 5" },
      { time: "12:00 AM", title: "Event 6" },
    ],
  },
  {
    date: "11/14",
    day: "Saturday",
    events: [
      { time: "8:00 AM", title: "Event 7" },
      { time: "10:00 AM", title: "Event 8" },
      { time: "12:00 PM", title: "Event 9" },
      { time: "2:00 PM", title: "Event 10" },
      { time: "6:00 PM", title: "Event 11" },
      { time: "9:00 PM", title: "Event 12" },
    ],
  },
  {
    date: "11/15",
    day: "Sunday",
    events: [
      { time: "8:00 AM", title: "Event 13" },
      { time: "10:00 AM", title: "Event 14" },
      { time: "11:00 AM", title: "Event 15" },
      { time: "12:00 PM", title: "Event 16" },
      { time: "2:00 PM", title: "Event 17" },
      { time: "3:00 PM", title: "Event 18" },
    ],
  },
];

const arrowClass =
  "absolute z-20 -translate-x-1/2 -translate-y-1/2 text-black hover:text-gray-500 transition-colors focus:outline-none disabled:opacity-30 disabled:text-gray-300 disabled:hover:text-gray-300 disabled:cursor-not-allowed";

const ScheduleSection = () => {
  const [dayIndex, setDayIndex] = useState(0);
  const activeDay = SCHEDULE[dayIndex];

  const isFirstDay = dayIndex === 0;
  const isLastDay = dayIndex === SCHEDULE.length - 1;

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
            {activeDay.date} ({activeDay.day})
          </p>

          {/* Times & events */}
          <div
            className="flex flex-col border-l border-black"
            style={{
              width: "27.6cqw",
              gap: "2.85cqw",
              padding: "0 2.78cqw",
              marginLeft: "2.78cqw",
            }}
          >
            {activeDay.events.map((event) => (
              <Fragment key={`${activeDay.date}-${event.time}-${event.title}`}>
                <div
                  className="grid items-center"
                  style={{
                    gridTemplateColumns: "11.1cqw 1fr",
                    fontSize: "1.39cqw",
                    lineHeight: 1.25,
                  }}
                >
                  <span className="font-semibold text-neutral-800">
                    {event.time}
                  </span>
                  <span className="text-neutral-700">{event.title}</span>
                </div>
              </Fragment>
            ))}
          </div>
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
