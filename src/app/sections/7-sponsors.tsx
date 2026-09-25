"use client";

const SPONSOR_SLOTS = [1, 2];

const SponsorsSection = () => {
  return (
    <section
      id="sponsors"
      className="relative w-full bg-[#f4f9fc] px-6 py-24 sm:py-32"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <h2
          className="text-5xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl"
          style={{
            fontFamily: "'Mochiy Pop One', sans-serif",
          }}
        >
          Sponsors
        </h2>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
          {SPONSOR_SLOTS.map((slot) => (
            <div
              key={slot}
              className="h-32 w-56 rounded-2xl bg-white shadow-sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
