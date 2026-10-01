"use client";

import Image, { type StaticImageData } from "next/image";
import { ImageIcon } from "lucide-react";
import coderLogo from "@/images/sponsors/coder.png";
import openmajorsLogo from "@/images/sponsors/openmajors.png";
import typesenseLogo from "@/images/sponsors/typesense.svg";

interface Sponsor {
  name: string;
  logo?: StaticImageData;
  url?: string;
}

// 2) One entry per card. Add/remove entries to add/remove cards.
const SPONSORS: Sponsor[] = [
  { name: "Coder", logo: coderLogo /*, url: "https://acme.com" */ },
  { name: "OpenMajors", logo: openmajorsLogo /*, url: "https://globex.com" */ },
  { name: "typesense", logo: typesenseLogo /* , url: "https://globex.com" */ },
];

const SponsorCard = ({ sponsor }: { sponsor: Sponsor }) => {
  const content = sponsor.logo ? (
    <Image
      src={sponsor.logo}
      alt={sponsor.name}
      className="max-h-full max-w-full object-contain"
    />
  ) : (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 text-neutral-400">
      <ImageIcon className="size-7" strokeWidth={1.5} />
      <span className="text-sm font-medium">{sponsor.name}</span>
    </div>
  );

  const className =
    "flex h-32 w-56 items-center justify-center rounded-2xl bg-white p-4 shadow-sm";

  return sponsor.url ? (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} transition-shadow hover:shadow-md`}
      aria-label={sponsor.name}
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
};

const SponsorsSection = () => {
  return (
    <section
      id="sponsors"
      className="relative w-full bg-[#e1edf5] px-6 py-24 sm:py-32 border-t-5 border-white"
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
          {SPONSORS.map((sponsor) => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
