import type { Metadata } from "next";
import "./about.css";

export const metadata: Metadata = {
  title: "AIAN — CMS",
  description: "Strapi + Next.js powered AIAN website",
};

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
