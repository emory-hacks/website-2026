"use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
import Countdown, { zeroPad } from "react-countdown";
import { IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";
import Image from "next/image";
import logo from "../images/logo_transparent.png";
import { useState, useEffect } from "react";

const DDAY = "2026-11-13";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="">
      <div className="-z-10 rounded-full animate-pulse absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/3 size-[30vw] bg-sky-200/30 blur-3xl" />
      <div className="-z-10 rounded-full animate-pulse absolute bottom-1/2 right-1/2 translate-x-1/3 translate-y-1/3 size-[30vw] bg-lime-200/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-lg border p-6 rounded-2xl backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <Image
              src={logo}
              alt="Emory Hacks Logo"
              width={170}
              className="object-contain"
            />
          </div>
          <div className="grow">
            <h1 className="mb-4 whitespace-nowrap">
              Emory Hacks
              <br />
              2026 Fall
            </h1>
            <h3 className="text-muted-foreground">11/13 - 11/15</h3>
          </div>
          <div className="w-20 flex flex-col justify-between text-muted-foreground/40 text-3xl font-black text-right">
            {isMounted ? (
              <Countdown
                date={new Date(DDAY)}
                intervalDelay={0}
                precision={3}
                renderer={({ days, hours, minutes, seconds }) => {
                  return (
                    <>
                      <p className="font-mono">{days}</p>
                      <p className="font-mono">{zeroPad(hours, 2)}</p>
                      <p className="font-mono">{zeroPad(minutes, 2)}</p>
                      <p className="font-mono">{zeroPad(seconds, 2)}</p>
                    </>
                  );
                }}
              />
            ) : (
              <>
                <p className="font-mono">--</p>
                <p className="font-mono">--</p>
                <p className="font-mono">--</p>
                <p className="font-mono">--</p>
              </>
            )}
          </div>
        </div>
        {/* <Button asChild size="lg" className="w-full mt-5">
          <Link href="/register">Register</Link>
        </Button> */}
      </div>

      <div className="fixed bottom-8 w-full flex flex-col items-center">
        <p className="text-sm text-muted-foreground mb-3 font-medium">
          Follow us on our socials!
        </p>
        <div className="flex justify-center items-center gap-5">
          <a
            href="https://www.instagram.com/emoryhacks_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Instagram"
          >
            <IconBrandInstagram className="size-6" />
          </a>
          <a
            href="https://www.linkedin.com/company/project-emory/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <IconBrandLinkedin className="size-6" />
          </a>
        </div>
      </div>
    </main>
  );
}
