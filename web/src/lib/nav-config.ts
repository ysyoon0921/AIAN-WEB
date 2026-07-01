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
    topHref: "/solutions/monitoring",
    topKo: "솔루션",
    topEn: "Solutions",
    links: [
      { href: "/solutions/monitoring", ko: "실시간 모니터링", en: "Live Monitoring" },
      { href: "/solutions/qms", ko: "품질 관리 (QMS)", en: "Quality (QMS)" },
      { href: "/solutions/mes", ko: "생산 계획 (MES)", en: "Production (MES)" },
      { href: "/solutions/predictive", ko: "설비 예지보전", en: "Predictive Care" },
    ],
  },
  {
    id: "industry",
    topHref: "/industry/electric",
    topKo: "산업분야",
    topEn: "Industry",
    links: [
      { href: "/industry/electric", ko: "전기 · 전자", en: "Electric · Electronic" },
      { href: "/industry/semiconductor", ko: "반도체", en: "Semiconductor" },
      { href: "/industry/automotive", ko: "자동차", en: "Automotive" },
    ],
  },
  {
    id: "customers",
    topHref: "/customers/clients",
    topKo: "고객사례",
    topEn: "Customers",
    links: [
      { href: "/customers/clients", ko: "고객사", en: "Clients" },
      { href: "/customers/cases", ko: "도입 사례", en: "Case Studies" },
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
  {
    id: "news",
    topHref: "/news",
    topKo: "소식",
    topEn: "News",
    links: [{ href: "/news", ko: "전체 소식", en: "All news" }],
  },
];

export function localePath(locale: Locale, path: string) {
  // Internal section routes get a locale prefix; anchors/mailto/tel/external stay as-is.
  if (/^\/(about|solutions|industry|customers|news)(\/|$)/.test(path)) {
    return `/${locale}${path}`;
  }
  return path;
}

export function switchLocalePath(locale: Locale, pathname: string) {
  const other = locale === "ko" ? "en" : "ko";
  if (pathname.startsWith(`/${locale}`)) {
    return pathname.replace(`/${locale}`, `/${other}`);
  }
  return `/${other}`;
}
