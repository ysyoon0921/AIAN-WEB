import { AboutLayout } from "@/components/AboutLayout";
import { formatMultiline } from "@/lib/format";
import {
  getAboutHistory,
  getTimelineItems,
  LOCALES,
  type Locale,
} from "@/lib/strapi";

export const dynamic = "force-dynamic";

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (LOCALES.includes(locale as Locale) ? locale : "ko") as Locale;
  const [history, items] = await Promise.all([
    getAboutHistory(lang),
    getTimelineItems(lang),
  ]);

  return (
    <AboutLayout locale={lang} active="/about/history" pagePath="/about/history">
      <div className="label">{history.label}</div>
      <h1>
        {formatMultiline(history.title).map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 ? <br /> : null}
          </span>
        ))}
      </h1>
      <p className="lead">{history.lead}</p>
      <div className="tl">
        {items.map((item) => (
          <div className="tl-item" key={`${item.year}-${item.sortOrder}`}>
            <div className="yr">{item.year}</div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </AboutLayout>
  );
}
