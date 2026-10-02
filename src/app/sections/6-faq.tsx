"use client";

import { motion } from "motion/react";
import { reveal } from "@/components/scroll-motion";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import faqData from "@/lib/faq.json";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="qna"
      className="relative flex w-full flex-col items-center overflow-x-clip px-5 py-20 landscape:min-h-[100svh] landscape:py-28"
    >
      <motion.h2
        {...reveal()}
        className="section-title section-title-mobile relative z-20 landscape:text-[clamp(44px,5.35vw,64px)]"
      >
        faq
      </motion.h2>

      <div className="relative mt-8 w-full max-w-3xl">
        <motion.div {...reveal(0.15, 60)} className="relative z-10">
          <div className="relative flex flex-col">
            {faqData.map((faq, index) => {
              const open = openIndex === index;
              return (
                <div
                  key={index}
                  className={`py-4 md:py-5 ${
                    index === faqData.length - 1
                      ? ""
                      : "border-b-2 border-dashed border-[#4a2a14]/60"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={open}
                    className="group flex w-full items-center justify-between gap-4 text-left focus:outline-none"
                  >
                    <h3 className="text-[20px] leading-snug tracking-[1.5px] text-[#4a2a14] transition-colors group-hover:text-[#f26c4f] md:text-[26px]">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`size-5 shrink-0 text-[#4a2a14] transition-transform duration-300 md:size-6 ${
                        open ? "rotate-180" : ""
                      }`}
                      strokeWidth={2.5}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      open
                        ? "mt-2 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="font-read pr-6 text-[16px] leading-relaxed tracking-wide text-[#4a2a14]/85 md:text-[19px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
