"use client";

import { useEffect } from "react";

// Matches the bounce area past the page edges to the gradient end it's next to
const OverscrollColor = () => {
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      const middle = (root.scrollHeight - window.innerHeight) / 2;
      root.classList.toggle("overscroll-bottom", window.scrollY > middle);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return null;
};

export default OverscrollColor;
