"use client";

import { useEffect } from "react";

type Props = {
  heroVideo?: boolean;
  reveal?: boolean;
};

export function SiteScripts({ heroVideo = true, reveal = true }: Props) {
  useEffect(() => {
    if (reveal) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15 },
      );
      document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
      return () => io.disconnect();
    }
  }, [reveal]);

  useEffect(() => {
    if (!heroVideo) return;
    const heroVideoEl = document.querySelector(".hero-video") as HTMLVideoElement | null;
    const hero = document.querySelector(".hero");
    if (!heroVideoEl || !hero) return;

    const markNoVideo = () => hero.classList.add("no-video");
    heroVideoEl.addEventListener("error", markNoVideo);
    heroVideoEl.addEventListener("loadeddata", () => hero.classList.remove("no-video"));
    heroVideoEl.play().catch(() => {});
  }, [heroVideo]);

  return null;
}

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
