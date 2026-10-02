"use client";

import { motion } from "motion/react";
import { reveal } from "@/components/scroll-motion";

import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";

const SOCIALS = [
  { label: "Email", href: "mailto:hello@emoryhacks.com", Icon: Mail },
  {
    label: "Instagram",
    href: "https://www.instagram.com/emoryhacks_",
    Icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/project-emory/",
    Icon: Linkedin,
  },
];

const Footer = () => {
  return (
    // Small and quiet, tucked into the bottom-right corner
    <footer className="relative flex w-full justify-start px-9 pb-12 pt-16 md:px-20 md:pb-20">
      <motion.div
        {...reveal(0, 20)}
        className="relative z-10 flex flex-col items-start gap-2 text-right"
      >
        <div className="flex items-center gap-2">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="hover-wiggle flex size-9 items-center justify-center rounded-full text-[#4a2a14]/70 transition-colors hover:text-[#f26c4f]"
            >
              <Icon className="size-5" strokeWidth={2} />
            </a>
          ))}
        </div>
        <p className="text-[16px] tracking-wide text-[#4a2a14] md:text-[18px]">
          Best,
        </p>
        <p className="text-[16px] tracking-wide text-[#4a2a14] md:text-[18px]">
          Emory Hacks Team
        </p>
        <Link
          href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
          target="_blank"
          className="text-[18px] tracking-wide text-[#4a2a14] underline-offset-4 underline"
        >
          MLH Code of Conduct
        </Link>
      </motion.div>
    </footer>
  );
};

export default Footer;
