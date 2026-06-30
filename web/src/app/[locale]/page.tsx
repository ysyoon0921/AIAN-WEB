import { HomeView } from "@/components/home/HomeView";
import {
  getCaseStudies,
  getHomePage,
  getProducts,
  getSiteSettings,
  LOCALES,
  type Locale,
} from "@/lib/strapi";

export const dynamic = "force-dynamic";

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (LOCALES.includes(locale as Locale) ? locale : "ko") as Locale;

  const [home, products, cases, settings] = await Promise.all([
    getHomePage(lang),
    getProducts(lang),
    getCaseStudies(lang),
    getSiteSettings(lang),
  ]);

  return <HomeView locale={lang} home={home} products={products} cases={cases} settings={settings} />;
}
