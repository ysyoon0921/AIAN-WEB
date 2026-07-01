function normalizeStrapiUrl(url?: string) {
  const base = url?.trim() || "http://127.0.0.1:1337";
  try {
    const parsed = new URL(base);
    // Windows Node fetch often fails on localhost (IPv6 ::1 vs IPv4 127.0.0.1).
    if (parsed.hostname === "localhost") {
      parsed.hostname = "127.0.0.1";
    }
    return parsed.origin;
  } catch {
    return "http://127.0.0.1:1337";
  }
}

const STRAPI_URL = normalizeStrapiUrl(process.env.STRAPI_URL);

async function fetchWithRetry(url: string, init?: RequestInit, retries = 2): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fetch(url, init);
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }
  const cause = lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(`Strapi connection failed (${url}): ${cause}`, {
    cause: lastError instanceof Error ? lastError : undefined,
  });
}

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

  const res = await fetchWithRetry(url.toString(), { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${url.pathname}`);
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

export async function getAboutIntro(locale: Locale) {
  const json = await fetchStrapi<StrapiResponse<AboutIntro>>("/about-intro", locale);
  return json.data;
}

export async function getIntroCards(locale: Locale) {
  const json = await fetchStrapi<StrapiListResponse<IntroCard>>("/intro-cards", locale, {
    sort: "sortOrder:asc",
  });
  return json.data;
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
