const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

export type Locale = "ko" | "en";

export const LOCALES: Locale[] = ["ko", "en"];

type StrapiResponse<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

type StrapiListResponse<T> = {
  data: T[];
  meta?: Record<string, unknown>;
};

async function fetchStrapi<T>(path: string, locale: Locale): Promise<T> {
  const url = new URL(`/api${path}`, STRAPI_URL);
  url.searchParams.set("locale", locale);

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${path}`);
  }

  return res.json() as Promise<T>;
}

export type AboutCeo = {
  label: string;
  title: string;
  lead: string;
  name: string;
  role: string;
  body: string;
};

export type AboutHistory = {
  label: string;
  title: string;
  lead: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  sortOrder: number;
};

export async function getAboutCeo(locale: Locale) {
  const json = await fetchStrapi<StrapiResponse<AboutCeo>>("/about-ceo", locale);
  return json.data;
}

export async function getAboutHistory(locale: Locale) {
  const json = await fetchStrapi<StrapiResponse<AboutHistory>>("/about-history", locale);
  return json.data;
}

export async function getTimelineItems(locale: Locale) {
  const url = new URL("/api/timeline-items", STRAPI_URL);
  url.searchParams.set("locale", locale);
  url.searchParams.set("sort", "sortOrder:asc");

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} timeline-items`);
  }

  const json = (await res.json()) as StrapiListResponse<TimelineItem>;
  return json.data;
}
