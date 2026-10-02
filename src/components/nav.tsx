"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ExternalLinkIcon, Menu } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

const pastSites = [
  {
    year: "2025 fall",
    link: "https://emory-hacks-2025-fall-4xd4.onrender.com",
  },
  {
    year: "2025 spring",
    link: "https://emory-hacks-2025-spring-4xd4.onrender.com",
  },
];

const sectionLinks = [
  { label: "about", href: "#about" },
  { label: "tracks", href: "#tracks" },
  { label: "schedule", href: "#schedule" },
  { label: "sponsors", href: "#sponsors" },
];

const Nav = () => {
  return (
    <nav className="absolute flex h-24 items-center justify-end top-0 w-full z-[100] px-5 md:px-8 py-6">
      <MLHBadge />

      <div className="flex items-center gap-5 xl:gap-8 text-2xl xl:text-[28px] leading-none tracking-wide text-[#d95b40]">
        {sectionLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="hidden lg:inline-block hover-wiggle hover:text-[#8fbf4d] transition-colors"
          >
            {label}
          </Link>
        ))}

        {/* Previous Years Dropdown */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="hidden lg:flex items-center gap-1 hover-wiggle hover:text-[#8fbf4d] transition-colors focus:outline-none cursor-pointer">
            <span>history</span>
            <ChevronDown className="size-[0.8em]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-[#8fbf4d]">
            {pastSites.map(({ year, link }, i) => (
              <DropdownMenuItem
                key={i}
                className="cursor-pointer text-xl tracking-wide"
                asChild
              >
                <Link href={link} target="_blank">
                  {year}
                  <DropdownMenuShortcut>
                    <ExternalLinkIcon size={14} />
                  </DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Menu */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            aria-label="Open menu"
            className="lg:hidden flex items-center hover:text-[#8fbf4d] transition-colors focus:outline-none cursor-pointer"
          >
            <Menu size={34} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-[#8fbf4d]">
            {sectionLinks.map(({ label, href }) => (
              <DropdownMenuItem
                key={href}
                className="cursor-pointer text-xl tracking-wide"
                asChild
              >
                <Link href={href}>{label}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xl tracking-wide">
              previous years
            </DropdownMenuLabel>
            {pastSites.map(({ year, link }, i) => (
              <DropdownMenuItem
                key={i}
                className="cursor-pointer text-xl tracking-wide"
                asChild
              >
                <Link href={link} target="_blank">
                  {year}
                  <DropdownMenuShortcut>
                    <ExternalLinkIcon size={14} />
                  </DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Apply Button */}
        <Link
          href="https://luma.com/erlwfmoi"
          className="bg-[#f26c4f] text-white px-6 pt-2 pb-2.5 rounded-md hover:bg-[#d95b40] transition hover:scale-105 hover:-rotate-2 active:scale-95 shadow-sm"
        >
          apply now!
        </Link>
      </div>
    </nav>
  );
};

export default Nav;

const MLHBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, top: -20 }}
      animate={{ opacity: 1, top: 0 }}
      transition={{ delay: 1 }}
      className="absolute left-5 md:left-8 top-0 size-30 md:size-40"
    >
      <Link
        id="mlh-trust-badge"
        href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
        target="_blank"
        className="block w-full max-w-[100px]"
      >
        <Image
          src="https://logged-assets.s3.amazonaws.com/trust-badge/2027/mlh-trust-badge-2027-white.svg"
          alt="Major League Hacking 2026 Hackathon Season"
          width={100}
          height={100}
          className="w-full h-auto"
        />
      </Link>
    </motion.div>
  );
};
