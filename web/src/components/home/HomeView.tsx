import { ContactFormPlaceholder } from "@/components/home/ContactFormPlaceholder";
import { SiteNav } from "@/components/SiteNav";
import { ProductsSection } from "@/components/home/ProductsSection";
import { ShowcaseTabs } from "@/components/home/ShowcaseTabs";
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

  return (
    <>
      <SiteNav locale={locale} ctaLabel={settings.navCtaLabel} />

      <header className="hero no-video">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-overlay" />
        </div>
        <div className="wrap">
          <div className="hero-inner">
            <span className="eyebrow reveal">
              <span className="pulse" />
              {home.eyebrow}
            </span>
            <h1 className="reveal d1">{formatMultiline(home.heroTitle).map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 ? <br /> : null}</span>
            ))}</h1>
            <p className="sub reveal d2">{formatMultiline(home.heroSubtitle).map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 ? <br /> : null}</span>
            ))}</p>
            <div className="cta-row reveal d3">
              <a className="btn btn-primary" href="#contact">{home.ctaPrimary}</a>
              <a className="btn btn-ghost" href="#how">{home.ctaSecondary}</a>
            </div>
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
            <h2 className="h2 reveal d1">{formatMultiline(home.howTitle).map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 ? <br /> : null}</span>
            ))}</h2>
            <p className="lead reveal d2">{home.howLead}</p>
          </div>
        </div>
      </section>

      <ProductsSection
        products={products}
        label={home.productsLabel}
        title={home.productsTitle}
        lead={home.productsLead}
        scrollHint={locale === "ko" ? "스크롤하여 더 보기" : "Scroll to explore"}
        linkLabel={locale === "ko" ? "자세히 보기" : "Learn more"}
      />

      <section className="showcase" id="results">
        <div className="wrap">
          <h2 className="showcase-title">
            {formatMultiline(home.showcaseTitle).map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 ? <br /> : null}</span>
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
                <h3 className="reveal d1">{formatMultiline(feature.title).map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 ? <br /> : null}</span>
                ))}</h3>
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
              <h2 className="h2 reveal d1">{formatMultiline(home.contactTitle).map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 ? <br /> : null}</span>
              ))}</h2>
              <p className="lead reveal d2">{home.contactLead}</p>
              <div className="info-list reveal d3">
                {settings.phone ? (
                  <div className="row">
                    <div className="ic">☎</div>
                    <div>
                      <div className="k">{locale === "ko" ? "전화" : "Phone"}</div>
                      <div className="val"><a href={`tel:${settings.phone}`}>{settings.phone}</a></div>
                    </div>
                  </div>
                ) : null}
                <div className="row">
                  <div className="ic">✉</div>
                  <div>
                    <div className="k">{locale === "ko" ? "이메일" : "Email"}</div>
                    <div className="val"><a href={`mailto:${settings.email}`}>{settings.email}</a></div>
                  </div>
                </div>
                {settings.address ? (
                  <div className="row">
                    <div className="ic">📍</div>
                    <div>
                      <div className="k">{locale === "ko" ? "오시는 길" : "Office"}</div>
                      <div className="val">{settings.address}</div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <ContactFormPlaceholder
              locale={locale}
              label={locale === "ko" ? "문의 보내기" : "Send message"}
            />
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="logo" aria-label="AIAN">
                <img className="logo-mark" src="/assets/aian-mark.png" alt="" />
                <img className="logo-wordmark" src="/assets/aian-wordmark.png" alt="AIAN" />
              </div>
              <p>{settings.footerTagline}</p>
            </div>
            <div className="foot-col">
              <h5>{locale === "ko" ? "회사" : "Company"}</h5>
              <a href={`/${locale}/about/intro`}>{locale === "ko" ? "AIAN 소개" : "About AIAN"}</a>
              <a href={`/${locale}/about/ceo`}>CEO</a>
              <a href={`/${locale}/about/history`}>{locale === "ko" ? "회사 연혁" : "History"}</a>
              <a href={`/${locale}/about/location`}>Location</a>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 AIAN Inc.</span>
            <span>CMS · Strapi + Next.js</span>
          </div>
        </div>
      </footer>
    </>
  );
}
