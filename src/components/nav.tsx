"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

const pastSites = [
  {
    year: "2025 Fall",
    link: "https://emory-hacks-2025-fall-4xd4.onrender.com",
  },
  {
    year: "2025 Spring",
    link: "https://emory-hacks-2025-spring-4xd4.onrender.com",
  },
];

const Nav = () => {
  return (
    <nav className="absolute flex h-20 items-center justify-end top-0 w-full z-[100] px-8 py-6">
      <MLHBadge />

      <div className="flex items-center gap-6 font-medium text-gray-800">
        <Link href="#about" className="hover:text-gray-500 transition-colors">
          About
        </Link>
        <Link href="#tracks" className="hover:text-gray-500 transition-colors">
          Tracks
        </Link>
        <Link
          href="#schedule"
          className="hover:text-gray-500 transition-colors"
        >
          Schedule
        </Link>
        <Link
          href="#sponsors"
          className="hover:text-gray-500 transition-colors"
        >
          Sponsors
        </Link>

        {/* Previous Years Dropdown */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="flex items-center gap-1 hover:text-gray-500 transition-colors focus:outline-none cursor-pointer">
            <span>Previous Years</span>
            <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {pastSites.map(({ year, link }, i) => (
              <DropdownMenuItem key={i} className="cursor-pointer" asChild>
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
          className="bg-[#f26c4f] text-white px-5 py-2 rounded-md hover:bg-[#d95b40] transition-colors shadow-sm"
        >
          Apply
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
      className="absolute left-8 top-0 size-30 md:size-40"
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
