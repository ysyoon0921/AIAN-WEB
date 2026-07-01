import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { formatMultiline } from "@/lib/format";
import { localePath } from "@/lib/nav-config";
import {
  getSubpage,
  getSubpageNav,
  getSiteSettings,
  type Locale,
  type SubpageSection,
} from "@/lib/strapi";

type Props = {
  locale: Locale;
  section: SubpageSection;
  slug: string;
};

export async function SubpageView({ locale, section, slug }: Props) {
  const [page, settings] = await Promise.all([
    getSubpage(section, slug, locale),
    getSiteSettings(locale),
  ]);
  if (!page) return null;
  const nav = getSubpageNav(section, locale);

  return (
    <>
      <SiteNav
        locale={locale}
        theme="light"
        ctaLabel={settings.navCtaLabel}
        ctaHref={`/${locale}#contact`}
      />
      <main className="page">
        <div className="page-inner">
          <aside className="side">
            <div className="side-head">{page.sectionHead}</div>
            <div className="side-nav">
              {nav.map((item) => (
                <Link
                  key={item.slug}
                  href={localePath(locale, item.href)}
                  className={item.slug === slug ? "on" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </aside>
          <div className="content">
            <div className="label">{page.label}</div>
            <h1>
              {formatMultiline(page.title).map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 ? <br /> : null}
                </span>
              ))}
            </h1>
            <p className="lead">{page.lead}</p>
            {page.body.map((para, i) => (
              <p
                key={i}
                style={{
                  color: "var(--ink-soft, #4b5565)",
                  fontSize: 16,
                  lineHeight: 1.75,
                  marginTop: 16,
                  maxWidth: 640,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter locale={locale} settings={settings} contactHref={`/${locale}#contact`} />
    </>
  );
}
