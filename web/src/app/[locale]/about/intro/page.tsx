import { AboutLayout } from "@/components/AboutLayout";
import { formatMultiline } from "@/lib/format";
import { getAboutIntro, getIntroCards, getSiteSettings, LOCALES, type Locale } from "@/lib/strapi";


export default async function IntroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (LOCALES.includes(locale as Locale) ? locale : "ko") as Locale;
  const [intro, cards, settings] = await Promise.all([
    getAboutIntro(lang),
    getIntroCards(lang),
    getSiteSettings(lang),
  ]);

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
        {cards.map((card, index) => (
          <div className="intro-card" key={card.slug ?? index}>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </div>
        ))}
      </div>
    </AboutLayout>
  );
}
