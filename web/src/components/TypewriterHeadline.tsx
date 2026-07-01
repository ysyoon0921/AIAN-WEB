"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, twSplit, twType } from "@/lib/typewriter";

type Props = {
  as?: "h1" | "h2" | "h3";
  className?: string;
  speed?: number;
  start?: "mount" | "intersect";
  children: React.ReactNode;
};

export function TypewriterHeadline({
  as: Tag = "h1",
  className,
  speed = 55,
  start = "mount",
  children,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) {
      el?.querySelectorAll(".tw-ch").forEach((node) => node.classList.add("on"));
      return;
    }

    const caret = document.createElement("span");
    caret.className = "code-caret";
    caret.setAttribute("aria-hidden", "true");

    const run = () => {
      const chars = twSplit(el);
      twType(chars, caret, speed);
    };

    if (start === "mount") {
      run();
      return;
    }

    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done) {
            done = true;
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [speed, start, children]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
