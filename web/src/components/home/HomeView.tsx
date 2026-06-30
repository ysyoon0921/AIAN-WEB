import { ContactForm, HeroCta } from "@/components/home/ContactForm";
import { ProductsSection } from "@/components/home/ProductsSection";
import { ShowcaseTabs } from "@/components/home/ShowcaseTabs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { SiteScripts } from "@/components/SiteScripts";
import { formatMultiline } from "@/lib/format";
import type {
  CaseStudy,
  HomePage,
  Locale,
  Product,
  SiteSettings,
} from "@/lib/strapi";

type Props = {
  locale: Locale;
  home: HomePage;
  products: Product[];
  cases: CaseStudy[];
  settings: SiteSettings;
};

function FeatureVisual({ visual }: { visual: string }) {
  if (visual === "gauge") {
    return (
      <div className="visual reveal d2" style={{ background: "linear-gradient(135deg,#f5f7fa,#eceff3)" }}>
        <div className="gauge">
          <span style={{ fontSize: 32, fontWeight: 800, color: "var(--ink)" }}>78%</span>
        </div>
      </div>
    );
  }
  if (visual === "pills") {
    return (
      <div className="visual reveal d2">
        <div className="mock">
          <div className="bar m" />
          <div className="bar" />
          <div className="bar s" />
          <div style={{ marginTop: 16 }}>
            <span className="pill">OK 86</span>
            <span className="pill">Check 7</span>
            <span className="pill">Stop 1</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="visual reveal d2">
      <div className="mock">
        <div className="bar" />
        <div className="bar m" />
        <div className="bar" />
        <div className="bar s" />
      </div>
    </div>
  );
}

export function HomeView({ locale, home, products, cases, settings }: Props) {
  const marquee = [...home.marqueeItems, ...home.marqueeItems];
  const t = (ko: string, en: string) => (locale === "ko" ? ko : en);

  return (
    <>
      <SiteNav locale={locale} ctaLabel={settings.navCtaLabel} />
      <SiteScripts heroVideo reveal />

      <header className="hero">
        <div className="hero-bg" aria-hidden="true">
          <video className="hero-video" autoPlay muted loop playsInline preload="auto">
            <source src="/assets/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
        </div>
        <div className="wrap">
          <div className="hero-inner">
            <span className="eyebrow reveal">
              <span className="pulse" />
              {home.eyebrow}
            </span>
            <h1 className="reveal d1">
              {formatMultiline(home.heroTitle).map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 ? <br /> : null}
                </span>
              ))}
            </h1>
            <p className="sub reveal d2">
              {formatMultiline(home.heroSubtitle).map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
            <HeroCta locale={locale} primary={home.ctaPrimary} secondary={home.ctaSecondary} />
            <div className="hero-trust reveal d4">{home.heroTrust}</div>
          </div>
        </div>
      </header>

      <div className="marquee" id="customers">
        <div className="track">
          {marquee.map((name, i) => (
            <span key={`${name}-${i}`}>{i % 2 === 1 ? "·" : name}</span>
          ))}
        </div>
      </div>

      <section className="statement wrap">
        <h2 className="reveal">
          {home.statementLine1}
          <br />
          <span className="muted">{home.statementMuted}</span>
        </h2>
      </section>

      <section className="block" id="how">
        <div className="wrap">
          <div className="center" style={{ maxWidth: 680, margin: "0 auto" }}>
            <div className="label reveal">{home.howLabel}</div>
            <h2 className="h2 reveal d1">
              {formatMultiline(home.howTitle).map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
            <p className="lead reveal d2">{home.howLead}</p>
          </div>
        </div>
      </section>

      <ProductsSection
        products={products}
        label={home.productsLabel}
        title={home.productsTitle}
        lead={home.productsLead}
        scrollHint={t("스크롤하여 더 보기", "Scroll to explore")}
        linkLabel={t("자세히 보기", "Learn more")}
      />

      <section className="showcase" id="results">
        <div className="wrap">
          <h2 className="showcase-title">
            {formatMultiline(home.showcaseTitle).map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 ? <br /> : null}
              </span>
            ))}
          </h2>
          <ShowcaseTabs items={cases} />
        </div>
      </section>

      <section className="block" id="feature">
        <div className="wrap">
          {home.features.map((feature, index) => (
            <div className={`feature-row${index % 2 === 1 ? " reverse" : ""}`} key={feature.tag}>
              <div>
                <span className="feature-tag reveal">{feature.tag}</span>
                <h3 className="reveal d1">
                  {formatMultiline(feature.title).map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </h3>
                <p className="reveal d2">{feature.description}</p>
                <div className="flist reveal d3">
                  {feature.bullets.map((bullet) => (
                    <div key={bullet}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a1020" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {bullet}
                    </div>
                  ))}
                </div>
              </div>
              <FeatureVisual visual={feature.visual} />
            </div>
          ))}
        </div>
      </section>

      <section className="block contact" id="contact">
        <div className="hero-bg">
          <div className="orb a" style={{ background: "radial-gradient(circle,rgba(255,255,255,.08),transparent 70%)" }} />
          <div className="orb b" style={{ background: "radial-gradient(circle,rgba(255,255,255,.05),transparent 70%)" }} />
        </div>
        <div className="wrap">
          <div className="contact-grid">
            <div>
              <div className="label reveal" style={{ background: "rgba(255,255,255,.1)", color: "#fff" }}>
                CONTACT
              </div>
              <h2 className="h2 reveal d1">
                {formatMultiline(home.contactTitle).map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 ? <br /> : null}
                  </span>
                ))}
              </h2>
              <p className="lead reveal d2">{home.contactLead}</p>
              <div className="info-list reveal d3">
                {settings.phone ? (
                  <div className="row">
                    <div className="ic">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <div className="k">{t("전화", "Phone")}</div>
                      <div className="val">
                        <a href={`tel:${settings.phone}`}>{settings.phone}</a>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="row">
                  <div className="ic">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-10 5L2 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="k">{t("이메일", "Email")}</div>
                    <div className="val">
                      <a href={`mailto:${settings.email}`}>{settings.email}</a>
                    </div>
                  </div>
                </div>
                {settings.address ? (
                  <div className="row">
                    <div className="ic">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <div className="k">{t("오시는 길", "Office")}</div>
                      <div className="val">{settings.address}</div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>

      <SiteFooter locale={locale} settings={settings} />
    </>
  );
}
