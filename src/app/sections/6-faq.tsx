"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import flower3 from "@/images/about_flower3.png"; // bud (left)
import flower2 from "@/images/about_flower2.png"; // single flower (right)

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
      className="relative flex min-h-[100svh] w-full items-center justify-center bg-[#f4f9fc] overflow-hidden"
    >
      <div
        className="relative shrink-0"
        style={{
          width: "min(100%, calc(100svh * 1440 / 1200))",
          aspectRatio: "1440 / 1200",
          containerType: "inline-size",
        }}
      >
        {/* Flower 3 */}
        <div
          className="pointer-events-none absolute z-0"
          style={{
            left: "15.81%",
            top: "43.39%",
            width: "16.18%",
            aspectRatio: "233 / 540",
            transform: "rotate(-17.69deg) scaleX(-1)",
          }}
        >
          <Image
            src={flower3}
            alt=""
            fill
            sizes="20vw"
            className="object-contain"
          />
        </div>

        {/* Flower 2 */}
        <div
          className="pointer-events-none absolute z-0"
          style={{
            left: "75.4%",
            top: "66.32%",
            width: "7.71%",
            aspectRatio: "111 / 301",
            transform: "rotate(22.65deg)",
          }}
        >
          <Image
            src={flower2}
            alt=""
            fill
            sizes="10vw"
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h2
          className="absolute z-20 -translate-x-1/2 whitespace-nowrap leading-none text-black"
          style={{
            left: "50%",
            top: "16.75%",
            fontSize: "5.35cqw",
            fontFamily: "'Mochiy Pop One', sans-serif",
          }}
        >
          Q&A
        </h2>

        {/* Card */}
        <div
          className="absolute z-10 bg-white/80 backdrop-blur-md shadow-xl border border-white/40 overflow-y-auto custom-scrollbar"
          style={{
            left: "23.89%",
            top: "27.5%",
            width: "52.22%",
            height: "61%",
            borderRadius: "2.78cqw",
            padding: "5.2cqw 4.4cqw",
          }}
        >
          <div className="flex flex-col w-full">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`flex flex-col border-b-2 border-black/10 ${
                  index === faqData.length - 1 ? "border-b-0" : ""
                }`}
                style={{ padding: "1.84cqw 0" }}
              >
                {/* Question Trigger */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full text-left focus:outline-none group"
                  style={{ gap: "1cqw" }}
                >
                  <h3
                    className="text-gray-900 group-hover:text-gray-600 transition-colors"
                    style={{
                      fontSize: "1.32cqw",
                      lineHeight: 1.3,
                      fontFamily: "'Mochiy Pop One', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`shrink-0 text-gray-500 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                    style={{ width: "1.5cqw", height: "1.5cqw" }}
                  />
                </button>

                {/* Answer Dropdown */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                  style={{ marginTop: openIndex === index ? "0.8cqw" : 0 }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="text-gray-700 font-medium"
                      style={{
                        fontSize: "1.1cqw",
                        lineHeight: 1.5,
                        paddingRight: "2cqw",
                      }}
                    >
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
