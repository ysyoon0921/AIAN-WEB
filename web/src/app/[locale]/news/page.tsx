import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { listNews } from "@/lib/news";
import { getSiteSettings, LOCALES, type Locale } from "@/lib/strapi";

export default async function NewsListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (LOCALES.includes(locale as Locale) ? locale : "ko") as Locale;
  const posts = listNews(lang);
  const settings = await getSiteSettings(lang);
  const t = (ko: string, en: string) => (lang === "ko" ? ko : en);

  return (
    <>
      <SiteNav locale={lang} theme="light" ctaLabel={settings.navCtaLabel} ctaHref={`/${lang}#contact`} />
      <main style={{ paddingTop: 120, paddingBottom: 96, minHeight: "60vh" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
          <div className="label">NEWS</div>
          <h1 style={{ fontSize: "clamp(30px,5vw,48px)", fontWeight: 800, letterSpacing: "-.04em", marginTop: 8 }}>
            {t("소식", "News")}
          </h1>
          <p className="lead" style={{ marginTop: 14 }}>
            {t("AIAN의 새로운 소식을 전해드립니다.", "The latest from AIAN.")}
          </p>
          <div style={{ marginTop: 40 }}>
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/${lang}/news/${p.slug}`}
                style={{
                  display: "block",
                  padding: "24px 0",
                  borderTop: "1px solid var(--line, #ebedf1)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-faint, #8a95a5)" }}>{p.date}</div>
                <div style={{ fontSize: 21, fontWeight: 700, marginTop: 6, letterSpacing: "-.02em" }}>{p.title}</div>
                <div style={{ fontSize: 15, color: "var(--ink-soft, #4b5565)", marginTop: 8, lineHeight: 1.6 }}>
                  {p.summary}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter locale={lang} settings={settings} contactHref={`/${lang}#contact`} />
    </>
  );
}
