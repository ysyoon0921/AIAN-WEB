import { AboutLayout } from "@/components/AboutLayout";
import { getAboutLocation, LOCALES, type Locale } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (LOCALES.includes(locale as Locale) ? locale : "ko") as Locale;
  const location = await getAboutLocation(lang);

  return (
    <AboutLayout locale={lang} active="/about/location" pagePath="/about/location">
      <div className="label">{location.label}</div>
      <h1>{location.title}</h1>
      <div className="location-map">
        <iframe
          className="naver-map-embed"
          title={location.title}
          src={location.mapEmbedUrl}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        className="map-open-link"
        href={location.mapLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {location.mapLinkLabel}
      </a>
    </AboutLayout>
  );
}
