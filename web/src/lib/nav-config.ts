import type { Locale } from "./strapi";

export type NavLink = { href: string; ko: string; en: string };

export type NavSection = {
  id: string;
  topHref: string;
  topKo: string;
  topEn: string;
  links: NavLink[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    id: "solutions",
    topHref: "/solutions/monitoring.html",
    topKo: "솔루션",
    topEn: "Solutions",
    links: [
      { href: "/solutions/monitoring.html", ko: "실시간 모니터링", en: "Live Monitoring" },
      { href: "/solutions/qms.html", ko: "품질 관리 (QMS)", en: "Quality (QMS)" },
      { href: "/solutions/mes.html", ko: "생산 계획 (MES)", en: "Production (MES)" },
      { href: "/solutions/predictive.html", ko: "설비 예지보전", en: "Predictive Care" },
    ],
  },
  {
    id: "industry",
    topHref: "/industry/electric.html",
    topKo: "산업분야",
    topEn: "Industry",
    links: [
      { href: "/industry/electric.html", ko: "전기 · 전자", en: "Electric · Electronic" },
      { href: "/industry/semiconductor.html", ko: "반도체", en: "Semiconductor" },
      { href: "/industry/automotive.html", ko: "자동차", en: "Automotive" },
    ],
  },
  {
    id: "customers",
    topHref: "/customers/clients.html",
    topKo: "고객사례",
    topEn: "Customers",
    links: [
      { href: "/customers/clients.html", ko: "고객사", en: "Clients" },
      { href: "/customers/cases.html", ko: "도입 사례", en: "Case Studies" },
    ],
  },
  {
    id: "about",
    topHref: "/about/intro",
    topKo: "회사소개",
    topEn: "About",
    links: [
      { href: "/about/intro", ko: "AIAN 소개", en: "About AIAN" },
      { href: "/about/ceo", ko: "CEO", en: "CEO" },
      { href: "/about/history", ko: "회사 연혁", en: "History" },
      { href: "/about/location", ko: "Location", en: "Location" },
    ],
  },
];

export function localePath(locale: Locale, path: string) {
  if (path.startsWith("/about/")) return `/${locale}${path}`;
  return path;
}

export function switchLocalePath(locale: Locale, pathname: string) {
  const other = locale === "ko" ? "en" : "ko";
  if (pathname.startsWith(`/${locale}`)) {
    return pathname.replace(`/${locale}`, `/${other}`);
  }
  return `/${other}`;
}
