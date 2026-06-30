import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import type { Locale, SiteSettings } from "@/lib/strapi";

const SIDEBAR = [
  { href: "/about/intro", ko: "AIAN 소개", en: "About AIAN" },
  { href: "/about/ceo", ko: "CEO", en: "CEO" },
  { href: "/about/history", ko: "회사 연혁", en: "History" },
  { href: "/about/location", ko: "Location", en: "Location" },
] as const;

type Props = {
  locale: Locale;
  active: (typeof SIDEBAR)[number]["href"];
  settings: SiteSettings;
  children: React.ReactNode;
};

export function AboutLayout({ locale, active, settings, children }: Props) {
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
            <div className="side-head">{locale === "ko" ? "회사소개" : "About"}</div>
            <div className="side-nav">
              {SIDEBAR.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className={active === item.href ? "on" : undefined}
                >
                  {locale === "ko" ? item.ko : item.en}
                </Link>
              ))}
            </div>
          </aside>
          <div className="content">{children}</div>
        </div>
      </main>
      <SiteFooter locale={locale} settings={settings} contactHref={`/${locale}#contact`} />
    </>
  );
}
