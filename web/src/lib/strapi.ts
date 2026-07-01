// Local content provider (formerly Strapi client).
// Content now lives in `src/content/data.ts` — no server, no DB, no CMS.
// Kept this module name/exports stable so pages & components need no changes.

import {
  PRODUCTS,
  CASE_STUDIES,
  HOME,
  MARQUEE,
  ABOUT_INTRO,
  ABOUT_CEO,
  ABOUT_HISTORY,
  TIMELINE,
  ABOUT_LOCATION,
  SITE_SETTINGS,
  SUBPAGES,
  SUBPAGE_HEADS,
} from "@/content/data";

export type Locale = "ko" | "en";

export const LOCALES: Locale[] = ["ko", "en"];

type StrapiMedia = {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
};

export function mediaUrl(media?: StrapiMedia | null, fallback?: string) {
  if (!media?.url) return fallback ?? null;
  return media.url;
}

export type SiteSettings = {
  siteName: string;
  phone?: string;
  email?: string;
  address?: string;
  footerTagline?: string;
  navCtaLabel?: string;
};

export type AboutCeo = {
  label: string;
  title: string;
  lead: string;
  name: string;
  role: string;
  body: string;
  photo?: StrapiMedia | null;
};

export type AboutHistory = { label: string; title: string; lead: string };

export type AboutIntro = {
  label: string;
  title: string;
  lead: string;
};

export type IntroCard = {
  slug: string;
  title: string;
  body: string;
  sortOrder: number;
};

export type AboutLocation = {
  label: string;
  title: string;
  mapEmbedUrl: string;
  mapLinkUrl: string;
  mapLinkLabel: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  sortOrder: number;
};

export type HomePage = {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTrust: string;
  ctaPrimary: string;
  ctaSecondary: string;
  howLabel: string;
  howTitle: string;
  howLead: string;
  productsLabel: string;
  productsTitle: string;
  productsLead: string;
  showcaseTitle: string;
  contactTitle: string;
  contactLead: string;
  marqueeItems: string[];
  features: {
    tag: string;
    title: string;
    description: string;
    bullets: string[];
    visual: string;
  }[];
};

export type Product = {
  slug: string;
  cardId: string;
  badge: string;
  name: string;
  headline: string;
  description: string;
  tags: string[];
  linkUrl: string;
  sortOrder: number;
  theme: "default" | "dark" | "gauge";
};

export type CaseStudy = {
  slug: string;
  tabLabel: string;
  category: string;
  title: string;
  description: string;
  bullets: string[];
  mockTitle: string;
  mockStats: { value: string; label: string }[];
  links: { label: string; url: string }[];
  sortOrder: number;
};

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  return SITE_SETTINGS[locale];
}

export async function getAboutCeo(locale: Locale): Promise<AboutCeo> {
  const photo = (ABOUT_CEO as { photo?: string }).photo;
  return { ...ABOUT_CEO[locale], photo: photo ? { url: photo } : null };
}

export async function getAboutHistory(locale: Locale): Promise<AboutHistory> {
  return ABOUT_HISTORY[locale];
}

export async function getAboutIntro(locale: Locale): Promise<AboutIntro> {
  const { label, title, lead } = ABOUT_INTRO[locale];
  return { label, title, lead };
}

export async function getIntroCards(locale: Locale): Promise<IntroCard[]> {
  return ABOUT_INTRO[locale].cards.map((card, i) => ({
    slug: `card-${i + 1}`,
    title: card.title,
    body: card.body,
    sortOrder: i + 1,
  }));
}

export async function getAboutLocation(locale: Locale): Promise<AboutLocation> {
  const loc = ABOUT_LOCATION[locale];
  return {
    label: loc.label,
    title: loc.title,
    mapLinkLabel: loc.mapLinkLabel,
    mapEmbedUrl: ABOUT_LOCATION.mapEmbedUrl,
    mapLinkUrl: ABOUT_LOCATION.mapLinkUrl,
  };
}

export async function getTimelineItems(locale: Locale): Promise<TimelineItem[]> {
  return [...TIMELINE]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((item) => ({
      year: item.year,
      title: item[locale].title,
      description: item[locale].description,
      sortOrder: item.sortOrder,
    }));
}

export async function getHomePage(locale: Locale): Promise<HomePage> {
  return { ...HOME[locale], marqueeItems: MARQUEE };
}

export async function getProducts(locale: Locale): Promise<Product[]> {
  return [...PRODUCTS]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((p) => ({
      slug: p.slug,
      cardId: p.cardId,
      linkUrl: p.linkUrl,
      sortOrder: p.sortOrder,
      theme: p.theme as Product["theme"],
      badge: p[locale].badge,
      name: p[locale].name,
      headline: p[locale].headline,
      description: p[locale].description,
      tags: p[locale].tags,
    }));
}

export async function getCaseStudies(locale: Locale): Promise<CaseStudy[]> {
  return [...CASE_STUDIES]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((c) => ({
      slug: c.slug,
      sortOrder: c.sortOrder,
      tabLabel: c[locale].tabLabel,
      category: c[locale].category,
      title: c[locale].title,
      description: c[locale].description,
      bullets: c[locale].bullets,
      mockTitle: c[locale].mockTitle,
      mockStats: c[locale].mockStats,
      links: c[locale].links,
    }));
}

// ---- Solutions / Industry / Customers subpages ----
export type SubpageSection = keyof typeof SUBPAGES;

export type SubpageContent = {
  label: string;
  sectionHead: string;
  title: string;
  lead: string;
  body: string[];
};

export type SubpageNavItem = { slug: string; href: string; label: string };

export function getSubpageNav(section: SubpageSection, locale: Locale): SubpageNavItem[] {
  return SUBPAGES[section].map((item) => ({
    slug: item.slug,
    href: `/${section}/${item.slug}`,
    label: locale === "ko" ? item.navKo : item.navEn,
  }));
}

export async function getSubpage(
  section: SubpageSection,
  slug: string,
  locale: Locale,
): Promise<SubpageContent | null> {
  const item = SUBPAGES[section].find((x) => x.slug === slug);
  if (!item) return null;
  const head = SUBPAGE_HEADS[section];
  return {
    label: head.label,
    sectionHead: locale === "ko" ? head.ko : head.en,
    title: item[locale].h1,
    lead: item[locale].lead,
    body: item[locale].body,
  };
}
