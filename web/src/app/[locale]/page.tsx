import Link from "next/link";
import { LOCALES, type Locale } from "@/lib/strapi";

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (LOCALES.includes(locale as Locale) ? locale : "ko") as Locale;

  return (
    <main style={{ maxWidth: 720, margin: "120px auto", padding: "0 24px" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#4b5565" }}>Strapi + Next.js POC</p>
      <h1 style={{ fontSize: 36, fontWeight: 800, margin: "12px 0 24px" }}>
        {lang === "ko" ? "CMS 연동 미리보기" : "CMS Preview"}
      </h1>
      <p style={{ color: "#4b5565", lineHeight: 1.7, marginBottom: 24 }}>
        {lang === "ko"
          ? "Strapi에서 수정한 CEO·연혁 콘텐츠가 Next.js 페이지에 반영됩니다."
          : "CEO and History content edited in Strapi is rendered by Next.js."}
      </p>
      <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none" }}>
        <li>
          <Link href={`/${lang}/about/ceo`}>CEO →</Link>
        </li>
        <li>
          <Link href={`/${lang}/about/history`}>
            {lang === "ko" ? "회사 연혁" : "History"} →
          </Link>
        </li>
      </ul>
    </main>
  );
}
