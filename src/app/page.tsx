"use client";

import LandingSection from "@/app/sections/1-landing";
import AboutSection from "@/app/sections/2-about";
import TracksSection from "@/app/sections/3-tracks";
import ScheduleSection from "@/app/sections/4-schedule";
import SpeakerSection from "@/app/sections/5-speakers";
import FaqSection from "@/app/sections/6-faq";
import SponsorsSection from "@/app/sections/7-sponsors";
import Link from "next/link";
import { memo } from "react";

const Page = memo(() => {
  return (
    <main className="relative">
      <LandingSection />
      <AboutSection />
      <TracksSection />
      <ScheduleSection />
      <SpeakerSection />
      <FaqSection />
      <SponsorsSection />
    </main>
  );
});
Page.displayName = "Page";

export default Page;
