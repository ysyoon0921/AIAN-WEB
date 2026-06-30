import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIAN — CMS Preview",
  description: "Strapi + Next.js CMS proof of concept",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link rel="stylesheet" href="/assets/nav.css" />
        <link rel="stylesheet" href="/assets/subpage.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
