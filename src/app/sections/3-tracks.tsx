"use client";

import LeafCarousel from "@/components/ui/carousel";
import tracksData from "@/lib/tracks.json";

interface Track {
  title: string;
  desc: string;
}

const data: Track[] = tracksData;

const TracksSection = () => {
  return (
    <LeafCarousel
      id="tracks"
      title="TRACKS"
      items={data}
      getKey={(item) => item.title}
      firstLeaf="ladybug"
      itemLabel="Track"
      cardWidth="45%"
      renderCard={(item) => (
        <>
          <h3
            className="text-black leading-tight"
            style={{
              fontSize: "2.2cqw",
              fontFamily: "'Mochiy Pop One', sans-serif",
              fontWeight: 400,
            }}
          >
            {item.title}
          </h3>
          <p
            className="text-black font-medium"
            style={{ fontSize: "1.32cqw", lineHeight: 1.35 }}
          >
            {item.desc}
          </p>
        </>
      )}
    />
  );
};

export default TracksSection;
