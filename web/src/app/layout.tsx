import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIAN — 제조 현장을 잇는 가장 쉬운 방법",
  description: "복잡한 제조 현장을, 누구나 쓸 수 있는 소프트웨어로. IT와 제조를 연결하는 맞춤형 솔루션.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap"
        />
        <link rel="stylesheet" href="/assets/nav.css" />
        <link rel="stylesheet" href="/assets/subpage.css" />
        <link rel="stylesheet" href="/assets/home.css" />
        <link rel="stylesheet" href="/assets/products-scroll.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
