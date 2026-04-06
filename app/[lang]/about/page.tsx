import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPage } from "@/app-pages/about";
import { getDictionary, hasLocale } from "../dictionaries";
import {
  buildLanguageAlternates,
  buildLocalizedUrl,
  getLanguageTag,
  getOpenGraphAlternateLocales,
  getOpenGraphLocale,
} from "@/lib/seo";

export async function generateMetadata(
  props: PageProps<"/[lang]/about">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang);
  const title = dict.seo?.aboutTitle ?? dict.about.title;
  const description = dict.seo?.aboutDescription ?? dict.about.description;
  const keywords = dict.seo?.aboutKeywords ?? [
    "about crypto platform",
    "crypto tool",
    "crypto data source",
  ];
  const url = buildLocalizedUrl(lang, "/about");

  return {
    title,
    description,
    keywords,
    category: "finance",
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates("/about"),
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

export default async function AboutRoute(props: PageProps<"/[lang]/about">) {
  const { lang } = await props.params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return <AboutPage lang={lang} dict={dict} />;
}
