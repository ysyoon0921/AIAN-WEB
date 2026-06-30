import Link from "next/link";
import type { Locale } from "@/lib/strapi";

type Props = {
  locale: Locale;
  ctaLabel?: string;
};

export function SiteNav({ locale, ctaLabel }: Props) {
  const other = locale === "ko" ? "en" : "ko";

  return (
    <nav id="nav">
      <div className="nav-inner">
        <Link className="logo" href={`/${locale}`} aria-label="AIAN">
          <img className="logo-mark" src="/assets/aian-mark.png" alt="" />
          <img className="logo-wordmark" src="/assets/aian-wordmark.png" alt="AIAN" />
        </Link>
        <ul className="menu">
          <li className="nav-item">
            <span className="top">
              <span className="en">About</span>
              <span className="ko">회사소개</span>
            </span>
            <div className="drop">
              <Link href={`/${locale}/about/intro`}>
                {locale === "ko" ? "AIAN 소개" : "About AIAN"}
              </Link>
              <Link href={`/${locale}/about/ceo`}>CEO</Link>
              <Link href={`/${locale}/about/history`}>
                {locale === "ko" ? "회사 연혁" : "History"}
              </Link>
              <Link href={`/${locale}/about/location`}>Location</Link>
            </div>
          </li>
        </ul>
        <div className="nav-right">
          <div className="lang">
            <Link href={`/${locale}`} className={locale === "ko" ? "on" : ""}>
              KO
            </Link>
            <Link href={`/${other}`} className={locale === "en" ? "on" : ""}>
              EN
            </Link>
          </div>
          <a className="nav-cta" href="#contact">
            {ctaLabel ?? (locale === "ko" ? "상담 신청" : "CONTACT US")}
          </a>
        </div>
      </div>
    </nav>
  );
}
