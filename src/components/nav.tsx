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
// import { motion } from "motion/react";
// import Image from "next/image";

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
    <nav className="absolute flex h-14 items-center justify-end top-0 w-screen z-100 m-0 *:m-0 px-5">
      {/* <MLHBadge /> */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="text-sm flex items-center gap-2 font-mono px-2 py-1 rounded focus:outline-0 bg-primary/20">
          <span>2026 Fall</span>
          <ChevronDown size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {pastSites.map(({ year, link }, i) => (
            <DropdownMenuItem key={i} className="cursor-pointer" asChild>
              <Link href={link} target="_blank">
                {year}
                <DropdownMenuShortcut>
                  <ExternalLinkIcon />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Nav;
