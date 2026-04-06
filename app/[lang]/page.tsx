import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/app-pages/home";
import { getDictionary, hasLocale } from "./dictionaries";
import { getTrendingCoins, getUsdToFiatRates } from "@/lib/cryptoCompare";
import {
  buildLanguageAlternates,
  buildLocalizedUrl,
  getLanguageTag,
  getOpenGraphAlternateLocales,
  getOpenGraphLocale,
} from "@/lib/seo";

export async function generateMetadata(props: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang);
  const title = dict.seo?.homeTitle ?? dict.hero.title;
  const description = dict.seo?.homeDescription ?? dict.hero.description;
  const keywords = dict.seo?.homeKeywords ?? [
    "crypto ticker",
    "crypto converter",
    "bitcoin price",
    "ethereum price",
  ];
  const url = buildLocalizedUrl(lang);

  return {
    title,
    description,
    keywords,
    category: "finance",
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: dict.siteName,
      locale: getOpenGraphLocale(lang),
      alternateLocale: getOpenGraphAlternateLocales(lang),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    other: {
      "content-language": getLanguageTag(lang),
    },
  };
}

export default async function HomeRoute(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const [initialCoins, initialRates] = await Promise.all([
    getTrendingCoins(30),
    getUsdToFiatRates(),
  ]);

  return (
    <HomePage
      lang={lang}
      dict={dict}
      initialCoins={initialCoins}
      initialRates={initialRates}
    />
  );
}
