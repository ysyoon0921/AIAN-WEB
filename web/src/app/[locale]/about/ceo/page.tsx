import { AboutLayout } from "@/components/AboutLayout";
import { formatMultiline } from "@/lib/format";
import { getAboutCeo, LOCALES, mediaUrl, type Locale } from "@/lib/strapi";

export const dynamic = "force-dynamic";

export default async function CeoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (LOCALES.includes(locale as Locale) ? locale : "ko") as Locale;
  const ceo = await getAboutCeo(lang);
  const photoSrc = mediaUrl(ceo.photo, "/assets/ceo-photo.png");

  return (
    <AboutLayout locale={lang} active="/about/ceo" pagePath="/about/ceo">
      <div className="label">{ceo.label}</div>
      <h1>
        {formatMultiline(ceo.title).map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 ? <br /> : null}
          </span>
        ))}
      </h1>
      <p className="lead">{ceo.lead}</p>
      <div className="ceo-grid">
        <div className="ceo-photo">
          {photoSrc ? <img src={photoSrc} alt={ceo.name} /> : null}
        </div>
        <div>
          <div className="ceo-name">{ceo.name}</div>
          <div className="ceo-role">{ceo.role}</div>
          <div dangerouslySetInnerHTML={{ __html: ceo.body }} />
        </div>
      </div>
    </AboutLayout>
  );
}
