import type { Locale } from "./strapi";

export type NavLink = { href: string; ko: string; en: string; descKo?: string; descEn?: string };

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
      { href: "/solutions/monitoring", ko: "실시간 모니터링", en: "Live Monitoring", descKo: "설비·센서 데이터를 한 화면으로", descEn: "All your data on one live screen" },
      { href: "/solutions/qms", ko: "품질 관리 (QMS)", en: "Quality (QMS)", descKo: "불량을 데이터로 잡는 품질 관리", descEn: "Quality management that cuts defects" },
      { href: "/solutions/mes", ko: "생산 계획 (MES)", en: "Production (MES)", descKo: "주문부터 실적까지 자동으로", descEn: "Order to output, automated" },
      { href: "/solutions/predictive", ko: "설비 예지보전", en: "Predictive Care", descKo: "고장 전에 미리 대응", descEn: "Act before breakdowns" },
    ],
  },
  {
    id: "industry",
    topHref: "/industry/electric",
    topKo: "산업분야",
    topEn: "Industry",
    links: [
      { href: "/industry/electric", ko: "전기 · 전자", en: "Electric · Electronic", descKo: "다품종 소량 생산에 유연 대응", descEn: "Flexible high-mix production" },
      { href: "/industry/semiconductor", ko: "반도체", en: "Semiconductor", descKo: "정밀 공정의 추적성과 품질", descEn: "Traceability for precision processes" },
      { href: "/industry/automotive", ko: "자동차", en: "Automotive", descKo: "엄격한 품질 기준 충족", descEn: "Meets strict quality standards" },
    ],
  },
  {
    id: "customers",
    topHref: "/customers/clients",
    topKo: "고객사례",
    topEn: "Customers",
    links: [
      { href: "/customers/clients", ko: "고객사", en: "Clients", descKo: "120+ 제조 현장이 함께합니다", descEn: "120+ manufacturers trust us" },
      { href: "/customers/cases", ko: "도입 사례", en: "Case Studies", descKo: "현장에서 검증된 성과", descEn: "Proven results on the floor" },
    ],
  },
  {
    id: "about",
    topHref: "/about/intro",
    topKo: "회사소개",
    topEn: "About",
    links: [
      { href: "/about/intro", ko: "AIAN 소개", en: "About AIAN", descKo: "AIAN이 하는 일과 미션", descEn: "What AIAN does and our mission" },
      { href: "/about/ceo", ko: "CEO", en: "CEO", descKo: "대표 메시지", descEn: "Message from the CEO" },
      { href: "/about/history", ko: "회사 연혁", en: "History", descKo: "걸어온 발자취", descEn: "Our journey so far" },
      { href: "/about/location", ko: "Location", en: "Location", descKo: "오시는 길", descEn: "How to find us" },
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
