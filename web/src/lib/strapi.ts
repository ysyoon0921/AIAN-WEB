const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

export type Locale = "ko" | "en";

export const LOCALES: Locale[] = ["ko", "en"];

type StrapiResponse<T> = { data: T };
type StrapiListResponse<T> = { data: T[] };

type StrapiMedia = {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
};

async function fetchStrapi<T>(path: string, locale: Locale, query?: Record<string, string>): Promise<T> {
  const url = new URL(`/api${path}`, STRAPI_URL);
  url.searchParams.set("locale", locale);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, value);
    }
  }
  // Draft & Publish is disabled on all content types — omit status filter.

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${path}`);
  }
  return res.json() as Promise<T>;
}

export function mediaUrl(media?: StrapiMedia | null, fallback?: string) {
  if (!media?.url) return fallback ?? null;
  if (media.url.startsWith("http")) return media.url;
  return `${STRAPI_URL}${media.url}`;
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
  card1Title?: string;
  card1Body?: string;
  card2Title?: string;
  card2Body?: string;
  card3Title?: string;
  card3Body?: string;
  card4Title?: string;
  card4Body?: string;
  cards: { title: string; body: string }[];
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
  statementLine1: string;
  statementMuted: string;
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

export async function getSiteSettings(locale: Locale) {
  const json = await fetchStrapi<StrapiResponse<SiteSettings>>("/site-setting", locale);
  return json.data;
}

export async function getAboutCeo(locale: Locale) {
  const json = await fetchStrapi<StrapiResponse<AboutCeo>>("/about-ceo", locale, {
    populate: "photo",
  });
  return json.data;
}

export async function getAboutHistory(locale: Locale) {
  const json = await fetchStrapi<StrapiResponse<AboutHistory>>("/about-history", locale);
  return json.data;
}

export function normalizeIntroCards(cards: unknown): { title: string; body: string }[] {
  if (!cards) return [];
  if (typeof cards === "string") {
    try {
      return normalizeIntroCards(JSON.parse(cards));
    } catch {
      return [];
    }
  }
  if (!Array.isArray(cards)) return [];
  return cards
    .map((card) => {
      const item = card as { title?: string; body?: string };
      return { title: String(item.title ?? ""), body: String(item.body ?? "") };
    })
    .filter((card) => card.title || card.body);
}

export function introCardsFromFields(data: {
  card1Title?: string;
  card1Body?: string;
  card2Title?: string;
  card2Body?: string;
  card3Title?: string;
  card3Body?: string;
  card4Title?: string;
  card4Body?: string;
  cards?: unknown;
}): { title: string; body: string }[] {
  const fromFields = [
    { title: data.card1Title, body: data.card1Body },
    { title: data.card2Title, body: data.card2Body },
    { title: data.card3Title, body: data.card3Body },
    { title: data.card4Title, body: data.card4Body },
  ]
    .map((card) => ({ title: String(card.title ?? ""), body: String(card.body ?? "") }))
    .filter((card) => card.title || card.body);

  if (fromFields.length > 0) return fromFields;
  return normalizeIntroCards(data.cards);
}

export async function getAboutIntro(locale: Locale) {
  const json = await fetchStrapi<StrapiResponse<AboutIntro>>("/about-intro", locale);
  return { ...json.data, cards: introCardsFromFields(json.data) };
}

export async function getAboutLocation(locale: Locale) {
  const json = await fetchStrapi<StrapiResponse<AboutLocation>>("/about-location", locale);
  return json.data;
}

export async function getTimelineItems(locale: Locale) {
  const json = await fetchStrapi<StrapiListResponse<TimelineItem>>("/timeline-items", locale, {
    sort: "sortOrder:asc",
  });
  return json.data;
}

export async function getHomePage(locale: Locale) {
  const json = await fetchStrapi<StrapiResponse<HomePage>>("/home-page", locale);
  return json.data;
}

export async function getProducts(locale: Locale) {
  const json = await fetchStrapi<StrapiListResponse<Product>>("/products", locale, {
    sort: "sortOrder:asc",
  });
  return json.data;
}

export async function getCaseStudies(locale: Locale) {
  const json = await fetchStrapi<StrapiListResponse<CaseStudy>>("/case-studies", locale, {
    sort: "sortOrder:asc",
  });
  return json.data;
}
