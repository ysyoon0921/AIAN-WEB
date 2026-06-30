import { AboutLayout } from "@/components/AboutLayout";
import { formatMultiline } from "@/lib/format";
import { getAboutIntro, getSiteSettings, LOCALES, type Locale } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export default async function IntroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (LOCALES.includes(locale as Locale) ? locale : "ko") as Locale;
  const [intro, settings] = await Promise.all([getAboutIntro(lang), getSiteSettings(lang)]);

  return (
    <AboutLayout locale={lang} active="/about/intro" settings={settings}>
      <div className="label">{intro.label}</div>
      <h1>
        {formatMultiline(intro.title).map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 ? <br /> : null}
          </span>
        ))}
      </h1>
      <p className="lead">{intro.lead}</p>
      <div className="intro-cards">
        {intro.cards.map((card) => (
          <div className="intro-card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </div>
        ))}
      </div>
    </AboutLayout>
  );
}
