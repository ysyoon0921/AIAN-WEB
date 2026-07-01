import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { getNewsSource, newsSlugs } from "@/lib/news";
import { getSiteSettings, LOCALES, type Locale } from "@/lib/strapi";

export function generateStaticParams({ params }: { params: { locale: string } }) {
  const lang = (LOCALES.includes(params.locale as Locale) ? params.locale : "ko") as Locale;
  return newsSlugs(lang).map((slug) => ({ slug }));
}

const ARTICLE_CSS = `
.article h2{ font-size:22px; font-weight:700; letter-spacing:-.02em; margin-top:32px; }
.article p{ margin-top:14px; line-height:1.85; color:var(--ink-soft,#4b5565); }
.article ul{ margin-top:14px; padding-left:20px; }
.article li{ margin-top:8px; line-height:1.7; color:var(--ink-soft,#4b5565); }
.article strong{ color:var(--ink,#0a1020); font-weight:700; }
`;

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = (LOCALES.includes(locale as Locale) ? locale : "ko") as Locale;
  const source = getNewsSource(lang, slug);
  const settings = await getSiteSettings(lang);
  if (!source) notFound();

  const { content, frontmatter } = await compileMDX<{ title: string; date: string; summary: string }>({
    source,
    options: { parseFrontmatter: true },
  });

  const t = (ko: string, en: string) => (lang === "ko" ? ko : en);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ARTICLE_CSS }} />
      <SiteNav locale={lang} theme="light" ctaLabel={settings.navCtaLabel} ctaHref={`/${lang}#contact`} />
      <main style={{ paddingTop: 120, paddingBottom: 96, minHeight: "60vh" }}>
        <article style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }} className="article">
          <Link
            href={`/${lang}/news`}
            style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-faint, #8a95a5)", textDecoration: "none" }}
          >
            ← {t("소식 목록", "All news")}
          </Link>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-faint, #8a95a5)", marginTop: 28 }}>
            {frontmatter.date}
          </div>
          <h1 style={{ fontSize: "clamp(28px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1.2, marginTop: 8 }}>
            {frontmatter.title}
          </h1>
          <div style={{ marginTop: 24 }}>{content}</div>
        </article>
      </main>
      <SiteFooter locale={lang} settings={settings} contactHref={`/${lang}#contact`} />
    </>
  );
}
