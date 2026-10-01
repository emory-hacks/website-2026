"use client";

import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="relative w-full bg-[#e1edf5] overflow-hidden"
      style={{ aspectRatio: "1440 / 493", containerType: "inline-size" }}
    >
      {/* Text */}
      <div
        className="absolute z-10 flex flex-col items-center text-center -translate-x-1/2"
        style={{ left: "50%", top: "60.6%" }}
      >
        {/* Title */}
        <h2
          className="text-black whitespace-nowrap"
          style={{
            fontFamily: "'Mochiy Pop One', sans-serif",
            fontSize: "1.39cqw",
            lineHeight: 1.3,
          }}
        >
          EMORY HACKS 2026
        </h2>

        {/* Contact Us */}
        <p
          className="font-bold text-black"
          style={{ fontSize: "1.1cqw", marginTop: "4.4cqw", lineHeight: 1.3 }}
        >
          Contact Us
        </p>

        {/* Social Icons */}
        <div
          className="flex justify-center items-center"
          style={{ gap: "1.67cqw", marginTop: "0.55cqw" }}
        >
          <a
            href="mailto:hello@emoryhacks.com"
            className="text-gray-700 hover:text-black transition-colors"
            aria-label="Email"
          >
            <Mail style={{ width: "1.67cqw", height: "1.67cqw" }} />
          </a>
          <a
            href="https://www.instagram.com/emoryhacks_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black transition-colors"
            aria-label="Instagram"
          >
            <Instagram style={{ width: "1.67cqw", height: "1.67cqw" }} />
          </a>
          <a
            href="https://www.linkedin.com/company/project-emory/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin style={{ width: "1.67cqw", height: "1.67cqw" }} />
          </a>
        </div>

        {/* MLH Code of Conduct */}
        <Link
          href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
          target="_blank"
          className="text-gray-500 hover:text-gray-800 underline transition-colors font-medium"
          style={{ fontSize: "0.9cqw", marginTop: "0.9cqw" }}
        >
          MLH Code of Conduct
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
