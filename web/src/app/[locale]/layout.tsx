import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/lib/strapi";
import "./about.css";

export const metadata: Metadata = {
  title: "AIAN — CMS Preview",
  description: "Strapi + Next.js CMS proof of concept",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (LOCALES.includes(locale as Locale) ? locale : "ko") as Locale;

  return <div data-locale={lang}>{children}</div>;
}
