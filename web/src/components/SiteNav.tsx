"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { NAV_SECTIONS, localePath } from "@/lib/nav-config";
import type { Locale } from "@/lib/strapi";

type Props = {
  locale: Locale;
  theme?: "light" | "dark";
  ctaLabel?: string;
  ctaHref?: string;
};

export function SiteNav({ locale, theme = "dark", ctaLabel, ctaHref = "#contact" }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    const nav = document.getElementById("nav");
    if (!nav || theme === "light") return;

    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [theme]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/assets/nav.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <nav id="nav" data-theme={theme === "light" ? "light" : undefined}>
      <div className="nav-inner">
        <Link className="logo" href={`/${locale}`} aria-label="AIAN">
          <img className="logo-mark" src="/assets/aian-mark.png" alt="" />
          <img className="logo-wordmark" src="/assets/aian-wordmark.png" alt="AIAN" />
        </Link>
        <ul className="menu">
          {NAV_SECTIONS.map((section) => (
            <li className="nav-item" key={section.id}>
              <Link className="top" href={localePath(locale, section.topHref)}>
                <span className="en">{section.topEn}</span>
                <span className="ko">{section.topKo}</span>
              </Link>
              <div className="drop">
                {section.links.map((link) => (
                  <Link key={link.href} href={localePath(locale, link.href)}>
                    {locale === "ko" ? link.ko : link.en}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <div className="lang">
            <Link
              href={pathname.replace(/^\/(ko|en)/, "/ko")}
              className={locale === "ko" ? "on" : ""}
            >
              KO
            </Link>
            <Link
              href={pathname.replace(/^\/(ko|en)/, "/en")}
              className={locale === "en" ? "on" : ""}
            >
              EN
            </Link>
          </div>
          <a className="nav-cta" href={ctaHref}>
            {ctaLabel ?? (locale === "ko" ? "상담 신청" : "CONTACT US")}
          </a>
        </div>
      </div>
    </nav>
  );
}
