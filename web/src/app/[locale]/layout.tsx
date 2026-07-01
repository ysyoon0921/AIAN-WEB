import type { Metadata } from "next";
import "./about.css";
import { LOCALES } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "AIAN — 제조 현장을 잇는 가장 쉬운 방법",
  description: "복잡한 제조 현장을, 누구나 쓸 수 있는 소프트웨어로. IT와 제조를 연결하는 맞춤형 솔루션.",
};

// Pre-render /ko and /en at build time (static generation)
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
