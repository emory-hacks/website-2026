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
      className="relative w-full bg-[#f4f9fc] px-6 py-24 sm:py-32"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <h2
          className="text-5xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl"
          style={{
            fontFamily: "'Mochiy Pop One', sans-serif",
          }}
        >
          SCHEDULE
        </h2>

        {/* Schedule card with navigation arrows */}
        <div className="mt-10 flex w-full items-center justify-center gap-4">
          <button
            onClick={goToPrevious}
            className="p-2 text-black hover:text-gray-500 transition-colors focus:outline-none disabled:opacity-30 disabled:text-gray-300 disabled:hover:text-gray-300 disabled:cursor-not-allowed"
            aria-label="Previous day"
            disabled={isFirstDay}
          >
            <ArrowLeft size={40} strokeWidth={3} />
          </button>

          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
            <p
              className="text-lg font-bold text-neutral-900"
              style={{
                fontFamily: "'Mochiy Pop One', sans-serif",
                fontWeight: "400",
              }}
            >
              {activeDay.date} ({activeDay.day})
            </p>

            {/* Grid: time column | divider column (spans every row) | event column */}
            <div
              className="mt-6 grid"
              style={{
                gridTemplateColumns: "1px 5rem 1fr",
                columnGap: "1.5rem",
                rowGap: "1.5rem",
                paddingLeft: "1rem",
              }}
            >
              <div
                className="bg-black"
                style={{
                  gridColumn: 1,
                  gridRow: `1 / span ${activeDay.events.length}`,
                }}
              />

              {activeDay.events.map((event, index) => (
                <Fragment
                  key={`${activeDay.date}-${event.time}-${event.title}`}
                >
                  <span
                    style={{ gridColumn: 2, gridRow: index + 1 }}
                    className="self-center text-sm font-semibold text-neutral-800"
                  >
                    {event.time}
                  </span>
                  <span
                    style={{ gridColumn: 3, gridRow: index + 1 }}
                    className="self-center text-sm text-neutral-700"
                  >
                    {event.title}
                  </span>
                </Fragment>
              ))}
            </div>
          </div>

          <button
            onClick={goToNext}
            className="p-2 text-black hover:text-gray-500 transition-colors focus:outline-none disabled:opacity-30 disabled:text-gray-300 disabled:hover:text-gray-300 disabled:cursor-not-allowed"
            aria-label="Next day"
            disabled={isLastDay}
          >
            <ArrowRight size={40} strokeWidth={3} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
