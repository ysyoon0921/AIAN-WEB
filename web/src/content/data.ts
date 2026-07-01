// Content is now stored in editable JSON files (Decap CMS edits these).
// This module re-exports them under the names the app already uses,
// so pages/getters need no changes.

import homeJson from "./home.json";
import productsJson from "./products.json";
import casesJson from "./cases.json";
import subpagesJson from "./subpages.json";
import aboutJson from "./about.json";
import siteJson from "./site.json";

export const HOME = homeJson;
export const PRODUCTS = productsJson.items;
export const CASE_STUDIES = casesJson.items;
export const MARQUEE = siteJson.marquee;
export const SITE_SETTINGS = siteJson.settings;

export const SUBPAGE_HEADS = subpagesJson.heads;
export const SUBPAGES = {
  solutions: subpagesJson.solutions,
  industry: subpagesJson.industry,
  customers: subpagesJson.customers,
};

export const ABOUT_INTRO = aboutJson.intro;
export const ABOUT_CEO = aboutJson.ceo;
export const ABOUT_HISTORY = aboutJson.history;
export const ABOUT_LOCATION = aboutJson.location;
export const TIMELINE = aboutJson.timeline;
