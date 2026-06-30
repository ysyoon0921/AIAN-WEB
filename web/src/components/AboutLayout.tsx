import Link from "next/link";
import type { Locale } from "@/lib/strapi";

const SIDEBAR = [
  { href: "/about/intro", ko: "AIAN 소개", en: "About AIAN" },
  { href: "/about/ceo", ko: "CEO", en: "CEO" },
  { href: "/about/history", ko: "회사 연혁", en: "History" },
  { href: "/about/location", ko: "Location", en: "Location" },
] as const;

type Props = {
  locale: Locale;
  active: (typeof SIDEBAR)[number]["href"];
  pagePath: string;
  children: React.ReactNode;
};

export function AboutLayout({ locale, active, pagePath, children }: Props) {
  return (
    <>
      <nav id="nav" data-theme="light">
        <div className="nav-inner">
          <Link className="logo" href={`/${locale}`} aria-label="AIAN">
            <img className="logo-mark" src="/assets/aian-mark.png" alt="" />
            <img className="logo-wordmark" src="/assets/aian-wordmark.png" alt="AIAN" />
          </Link>
          <div className="nav-right">
            <div className="lang">
              <Link href={`/ko${pagePath}`} className={locale === "ko" ? "on" : ""}>
                KO
              </Link>
              <Link href={`/en${pagePath}`} className={locale === "en" ? "on" : ""}>
                EN
              </Link>
            </div>
            <span className="nav-cta cms-badge">CMS POC</span>
          </div>
        </div>
      </nav>

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
    </>
  );
}
