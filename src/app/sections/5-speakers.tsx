"use client";

import Image from "next/image";
import LeafCarousel from "@/components/ui/carousel";
import speakerData from "@/lib/speakers.json";

const SPEAKERS_TBA = true;

interface Speaker {
  name: string;
  description: string;
  img?: string;
}

const data: Speaker[] = speakerData;

const SpeakerSection = () => {
  return (
    <LeafCarousel
      id="speakers"
      title="SPEAKERS"
      items={data}
      getKey={(item) => item.name}
      firstLeaf="ant"
      itemLabel="Speaker"
      cardWidth="41.5%"
      disabled={SPEAKERS_TBA}
      cardStyle={
        SPEAKERS_TBA
          ? { alignItems: "center", justifyContent: "center" }
          : undefined
      }
      renderCard={(item) =>
        SPEAKERS_TBA ? (
          <h3
            className="text-black leading-tight"
            style={{
              fontSize: "2.2cqw",
              fontFamily: "'Mochiy Pop One', sans-serif",
              fontWeight: 400,
              padding: "1.6cqw 0",
            }}
          >
            TBA
          </h3>
        ) : (
          <>
            <div className="flex items-center" style={{ gap: "1.2cqw" }}>
              {item.img && (
                <Image
                  src={item.img}
                  alt={item.name}
                  width={128}
                  height={128}
                  className="shrink-0 rounded-full object-cover"
                  style={{ width: "4.5cqw", height: "4.5cqw" }}
                />
              )}
              <h3
                className="text-black leading-tight"
                style={{
                  fontSize: "2.2cqw",
                  fontFamily: "'Mochiy Pop One', sans-serif",
                  fontWeight: 400,
                }}
              >
                {item.name}
              </h3>
            </div>
            <p
              className="custom-scrollbar overflow-y-auto text-black font-medium"
              style={{
                fontSize: "1.32cqw",
                lineHeight: 1.35,
                maxHeight: "7.4cqw",
                paddingRight: "0.6cqw",
              }}
            >
              {item.description}
            </p>
          </>
        )
      }
    />
  );
};

export default SpeakerSection;
