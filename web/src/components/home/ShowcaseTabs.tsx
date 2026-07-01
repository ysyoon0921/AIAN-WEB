"use client";

import { useState } from "react";
import type { CaseStudy } from "@/lib/strapi";

type Props = {
  items: CaseStudy[];
};

export function ShowcaseTabs({ items }: Props) {
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="case-tabs" role="tablist">
        {items.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            className={`case-tab${index === active ? " on" : ""}`}
            role="tab"
            aria-selected={index === active}
            onClick={() => setActive(index)}
          >
            {item.tabLabel}
          </button>
        ))}
      </div>
      <div className="case-panels">
        {items.map((item, index) => (
          <article
            key={item.slug}
            className={`case-panel${index === active ? " on" : ""}`}
            data-case={index}
          >
            <div>
              <span className="case-cat">{item.category}</span>
              <h3>
                {item.title.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 ? <br /> : null}
                  </span>
                ))}
              </h3>
              <p className="case-desc">{item.description}</p>
              <div className="case-links">
                {item.links.map((link) => (
                  <a key={link.url + link.label} className="case-link" href={link.url}>
                    {link.label}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div className="case-visual-wrap">
              <div className="case-visual">
                <div className="case-mock">
                  <div className="case-mock-head">{item.mockTitle}</div>
                  <div className="case-mock-body">
                    <div className="case-mock-stat">
                      {item.mockStats.map((stat, statIndex) => (
                        <div key={`${stat.value}-${statIndex}`}>
                          <b>{stat.value}</b>
                          <small>{stat.label}</small>
                        </div>
                      ))}
                    </div>
                    <div className="case-mock-row m" />
                    <div className="case-mock-row" />
                    <div className="case-mock-row s" />
                  </div>
                </div>
              </div>
              <ul className="case-bullets">
                {item.bullets.map((bullet, bulletIndex) => (
                  <li key={`${bulletIndex}-${bullet}`}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
