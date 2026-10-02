"use client";

import { motion } from "motion/react";
import { reveal } from "@/components/scroll-motion";

import Image, { type StaticImageData } from "next/image";
import { ImageIcon } from "lucide-react";
import coderLogo from "@/images/sponsors/coder.webp";
import openmajorsLogo from "@/images/sponsors/openmajors.webp";
import typesenseLogo from "@/images/sponsors/typesense.svg";
import emoryNlpLogo from "@/images/sponsors/emorynlp.webp";
import cloud from "@/images/cloud-bg.webp";

interface Sponsor {
  name: string;
  logo?: StaticImageData;
  url?: string;
  /** each tier gets its own row, in this order; "lead" clouds are bigger */
  tier?: "lead" | "standard" | "community";
}

// One entry per sponsor. Lead sponsors show first, on their own row.
const SPONSORS: Sponsor[] = [
  { name: "Coder", logo: coderLogo, tier: "lead" },
  { name: "typesense", logo: typesenseLogo },
  { name: "OpenMajors", logo: openmajorsLogo },
  { name: "Emory NLP", logo: emoryNlpLogo, tier: "community" },
];

// Each logo floats on its own soft cloud instead of sitting in a box
const SponsorCard = ({
  sponsor,
  index,
}: {
  sponsor: Sponsor;
  index: number;
}) => {
  const lead = sponsor.tier === "lead";

  const content = sponsor.logo ? (
    <Image
      src={sponsor.logo}
      alt={sponsor.name}
      className={`relative w-auto object-contain ${
        lead
          ? "max-h-11 max-w-[62%] sm:max-h-[4.5rem]"
          : sponsor.tier === "community"
            ? // round badge-style logos need more height to read
              "max-h-20 sm:max-h-28"
            : "max-h-11 max-w-[76%] sm:max-h-16 sm:max-w-[70%]"
      }`}
    />
  ) : (
    <div className="relative flex flex-col items-center gap-1 text-[#4a2a14]/60">
      <ImageIcon className="size-7" strokeWidth={1.5} />
      <span className="text-sm">{sponsor.name}</span>
    </div>
  );

  const className = `relative block ${
    lead ? "h-32 w-60 sm:h-48 sm:w-96" : "h-32 w-44 sm:h-44 sm:w-80"
  }`;
  // Float lives on an inner layer so a link's hover-grow can still apply
  const body = (
    <div
      className="animate-float absolute inset-0 flex items-center justify-center"
      style={{ animationDelay: `${-index * 1.3}s` }}
    >
      <Image
        src={cloud}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-auto w-[135%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-95"
      />
      {content}
    </div>
  );

  return sponsor.url ? (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} transition-transform hover:scale-105`}
      aria-label={sponsor.name}
    >
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  );
};

const SponsorsSection = () => {
  const TIERS = ["lead", "standard", "community"] as const;
  const rows = TIERS.map((tier) =>
    SPONSORS.filter((s) => (s.tier ?? "standard") === tier),
  );

  return (
    <section id="sponsors" className="relative w-full px-6 py-24 sm:py-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <motion.h2
          {...reveal()}
          className="section-title text-5xl sm:text-[64px] leading-none whitespace-nowrap"
          style={{
            fontFamily: "var(--font-brand), sans-serif",
          }}
        >
          sponsors
        </motion.h2>

        {rows.map((row, r) =>
          row.length === 0 ? null : (
            <div
              key={r}
              className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-4 ${
                r === 0 ? "mt-8" : "mt-2"
              }`}
            >
              {row.map((sponsor) => {
                const i = SPONSORS.indexOf(sponsor);
                return (
                  <motion.div
                    key={sponsor.name}
                    {...reveal(0.15 + i * 0.1, 40, 0.9)}
                  >
                    <SponsorCard sponsor={sponsor} index={i} />
                  </motion.div>
                );
              })}
            </div>
          ),
        )}
      </div>
    </section>
  );
};

export default SponsorsSection;
