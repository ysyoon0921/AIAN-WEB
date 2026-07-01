import { SubpageView } from "@/components/SubpageView";
import { LOCALES, type Locale } from "@/lib/strapi";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = (LOCALES.includes(locale as Locale) ? locale : "ko") as Locale;
  return <SubpageView locale={lang} section="customers" slug="clients" />;
}
