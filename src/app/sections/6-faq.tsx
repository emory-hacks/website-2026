"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "Vorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
  {
    question: "Vorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
  {
    question: "Vorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
  {
    question: "Vorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
  {
    question: "Vorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
  {
    question: "Vorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
  {
    question: "Vorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="qna"
      className="relative min-h-screen w-full bg-[#f4f9fc] flex flex-col items-center justify-center overflow-hidden py-20"
    >
      {/* Left Green Graphic Placeholder */}
      <div className="absolute left-[5%] md:left-[15%] top-[45%] w-[30vw] md:w-[15vw] h-[40vh] bg-[#9cc044]"></div>

      {/* Right Green Graphic Placeholder */}
      <div className="absolute right-[5%] md:right-[15%] top-[45%] w-[30vw] md:w-[15vw] h-[40vh] bg-[#9cc044]"></div>

      {/* Center Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center w-[90%] sm:w-[80%] md:w-[65%] lg:w-[50%]">
        {/* Title */}
        <h2
          className="text-5xl md:text-7xl text-black mb-8 z-20"
          style={{ fontFamily: "'Mochiy Pop One', sans-serif" }}
        >
          Q&A
        </h2>

        <div className="w-full bg-white/80 backdrop-blur-md rounded-[40px] px-8 py-10 md:px-12 md:py-14 shadow-xl border border-white/40 h-[600px] md:h-[650px] overflow-y-auto custom-scrollbar">
          <div className="flex flex-col w-full">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`flex flex-col border-b-2 border-black/10 py-4 ${
                  index === faqData.length - 1 ? "border-b-0" : ""
                }`}
              >
                {/* Question Trigger */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full text-left focus:outline-none group"
                >
                  <h3
                    className="text-sm md:text-base font-bold text-gray-900 group-hover:text-gray-600 transition-colors"
                    style={{
                      fontFamily: "'Mochiy Pop One', sans-serif",
                      fontWeight: "400",
                    }}
                  >
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`size-5 text-gray-500 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {/* Answer Dropdown */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100 mt-3"
                      : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium pr-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
