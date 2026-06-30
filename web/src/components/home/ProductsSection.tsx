"use client";

import { useEffect } from "react";
import type { Product } from "@/lib/strapi";

type Props = {
  products: Product[];
  label: string;
  title: string;
  lead: string;
  scrollHint: string;
  linkLabel: string;
};

function ProductVisual({ theme }: { theme: Product["theme"] }) {
  if (theme === "dark") {
    return (
      <div className="p-media" style={{ background: "linear-gradient(150deg,#101a33,#1f1640)" }}>
        <div className="p-shot">
          <div className="ps-bar">
            <i />
            <i />
            <i />
          </div>
          <div className="ps-panel" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                width: 128,
                height: 128,
                borderRadius: "50%",
                background: "conic-gradient(#fff 0 78%,rgba(255,255,255,.12) 78% 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 92,
                  height: 92,
                  borderRadius: "50%",
                  background: "#16203b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 26,
                  fontWeight: 800,
                }}
              >
                78%
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-media">
      <div className="p-shot">
        <div className="ps-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="ps-panel">
          <div className="ps-stats">
            <div className="ps-stat">
              <b>94%</b>
              <small>Uptime</small>
            </div>
            <div className="ps-stat">
              <b>1,284</b>
              <small>Output</small>
            </div>
            <div className="ps-stat">
              <b>0.8%</b>
              <small>Defects</small>
            </div>
          </div>
          <div className="ps-chart">
            <i style={{ height: "50%" }} />
            <i style={{ height: "72%" }} />
            <i style={{ height: "45%" }} />
            <i style={{ height: "88%" }} />
            <i style={{ height: "63%" }} />
            <i style={{ height: "95%" }} />
            <i style={{ height: "70%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductsSection({ products, label, title, lead, scrollHint, linkLabel }: Props) {
  useEffect(() => {
    const existing = document.querySelector('script[data-products-scroll="1"]');
    if (existing) return;
    const script = document.createElement("script");
    script.src = "/assets/products-scroll.js";
    script.async = true;
    script.dataset.productsScroll = "1";
    document.body.appendChild(script);
  }, []);

  return (
    <section className="products-scroll" id="products">
      <div className="products-pin">
        <aside className="products-left">
          <span className="products-side-label">{label}</span>
          <div className="products-left-inner">
            <h2 className="h2">{title}</h2>
            <p className="lead">{lead}</p>
            <div className="products-meta">
              <div className="products-counter">
                <span className="cur">01</span> / 0{products.length}
              </div>
              <div className="products-dots" aria-hidden="true" />
            </div>
          </div>
        </aside>
        <div className="products-right">
          <div className="products-track">
            {products.map((product) => (
              <article className="product-card" key={product.slug}>
                <span className="p-card-id">{product.cardId}</span>
                <ProductVisual theme={product.theme} />
                <div className="p-card-body">
                  <span className="p-badge">{product.badge}</span>
                  <h3>
                    <span className="p-name">{product.name}</span>
                    <br />
                    {product.headline}
                  </h3>
                  <p className="p-desc">{product.description}</p>
                  <div className="p-tags">
                    {product.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a className="p-link" href={product.linkUrl}>
                    {linkLabel}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="products-hint">{scrollHint}</div>
      </div>
    </section>
  );
}
