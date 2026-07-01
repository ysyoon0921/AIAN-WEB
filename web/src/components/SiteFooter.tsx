import Link from "next/link";
import { localePath } from "@/lib/nav-config";
import type { Locale, SiteSettings } from "@/lib/strapi";

type Props = {
  locale: Locale;
  settings: SiteSettings;
  contactHref?: string;
};

export function SiteFooter({ locale, settings, contactHref = "#contact" }: Props) {
  const t = (ko: string, en: string) => (locale === "ko" ? ko : en);

  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link className="logo" href={`/${locale}`} aria-label="AIAN">
              <img className="logo-mark" src="/assets/aian-mark.png" alt="" />
              <img className="logo-wordmark" src="/assets/aian-wordmark.png" alt="AIAN" />
            </Link>
            <p>
              {settings.footerTagline}
              {locale === "ko"
                ? " 복잡한 현장을 누구나 쓸 수 있게 만듭니다."
                : " Making complex factories usable by everyone."}
            </p>
          </div>
          <div className="foot-col">
            <h5>{t("솔루션", "Solutions")}</h5>
            <Link href={localePath(locale, "/solutions/monitoring")}>{t("실시간 모니터링", "Live Monitoring")}</Link>
            <Link href={localePath(locale, "/solutions/qms")}>{t("품질 관리", "Quality")}</Link>
            <Link href={localePath(locale, "/solutions/mes")}>{t("생산 계획", "Planning")}</Link>
            <Link href={localePath(locale, "/solutions/predictive")}>{t("예지보전", "Predictive Care")}</Link>
          </div>
          <div className="foot-col">
            <h5>{t("산업분야", "Industry")}</h5>
            <Link href={localePath(locale, "/industry/electric")}>{t("전기 · 전자", "Electric")}</Link>
            <Link href={localePath(locale, "/industry/semiconductor")}>{t("반도체", "Semiconductor")}</Link>
            <Link href={localePath(locale, "/industry/automotive")}>{t("자동차", "Automotive")}</Link>
          </div>
          <div className="foot-col">
            <h5>{t("고객사례", "Customers")}</h5>
            <Link href={localePath(locale, "/customers/clients")}>{t("고객사", "Clients")}</Link>
            <Link href={localePath(locale, "/customers/cases")}>{t("도입 사례", "Case Studies")}</Link>
          </div>
          <div className="foot-col">
            <h5>{t("회사", "Company")}</h5>
            <Link href={localePath(locale, "/about/intro")}>{t("AIAN 소개", "About AIAN")}</Link>
            <Link href={localePath(locale, "/about/ceo")}>CEO</Link>
            <Link href={localePath(locale, "/about/history")}>{t("회사 연혁", "History")}</Link>
            <Link href={localePath(locale, "/about/location")}>Location</Link>
          </div>
          <div className="foot-col">
            <h5>{t("문의", "Contact")}</h5>
            <a href={contactHref}>{t("상담 신청", "Get in touch")}</a>
            {settings.email ? <a href={`mailto:${settings.email}`}>{settings.email}</a> : null}
            {settings.phone ? <a href={`tel:${settings.phone}`}>{settings.phone}</a> : null}
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 AIAN Inc. All rights reserved.</span>
          <span>{t("개인정보처리방침 · 이용약관", "Privacy · Terms")}</span>
        </div>
      </div>
    </footer>
  );
}
