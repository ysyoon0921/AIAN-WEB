import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/lib/strapi";

const NEWS_ROOT = path.join(process.cwd(), "src", "content", "news");

export type NewsMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

// Use the locale's folder; fall back to Korean if that locale has no posts.
function dirFor(locale: Locale): string {
  const localized = path.join(NEWS_ROOT, locale);
  if (fs.existsSync(localized) && fs.readdirSync(localized).some((f) => f.endsWith(".mdx"))) {
    return localized;
  }
  return path.join(NEWS_ROOT, "ko");
}

export function listNews(locale: Locale): NewsMeta[] {
  const dir = dirFor(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      return {
        slug: f.replace(/\.mdx$/, ""),
        title: String(data.title ?? f),
        date: String(data.date ?? ""),
        summary: String(data.summary ?? ""),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNewsSource(locale: Locale, slug: string): string | null {
  const file = path.join(dirFor(locale), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}

export function newsSlugs(locale: Locale): string[] {
  return listNews(locale).map((n) => n.slug);
}
