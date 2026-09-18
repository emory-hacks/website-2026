"use client";

import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#f4f9fc] flex flex-col items-center justify-center min-h-[400px] overflow-hidden">
      {/* Left Green Graphic Placeholder */}
      <div className="absolute left-0 bottom-0 w-[35vw] md:w-[30vw] h-[25vh] bg-[#9cc044]"></div>

      {/* Right Green Graphic Placeholder */}
      <div className="absolute right-0 bottom-0 w-[35vw] md:w-[30vw] h-[25vh] bg-[#9cc044]"></div>

      <div className="relative z-10 flex flex-col items-center text-center translate-y-[6vh] md:translate-y-[12vh]">
        {/* Title */}
        <h2
          className="text-base md:text-xl text-black"
          style={{ fontFamily: "'Mochiy Pop One', sans-serif" }}
        >
          EMORY HACKS 2026
        </h2>

        {/* Contact Us */}
        <p className="font-bold text-xs md:text-sm text-black mb-2">
          Contact Us
        </p>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-6 mb-12">
          <a
            href="mailto:hello@emoryhacks.com"
            className="text-gray-700 hover:text-black transition-colors"
            aria-label="Email"
          >
            <Mail className="size-5 md:size-6" />
          </a>
          <a
            href="https://www.instagram.com/emoryhacks_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="size-5 md:size-6" />
          </a>
          <a
            href="https://www.linkedin.com/company/project-emory/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-5 md:size-6" />
          </a>
        </div>

        {/* MLH Code of Conduct */}
        <Link
          href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
          target="_blank"
          className="text-xs md:text-sm text-gray-500 hover:text-gray-800 underline transition-colors font-medium"
        >
          MLH Code of Conduct
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
