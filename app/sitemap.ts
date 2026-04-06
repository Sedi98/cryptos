import type { MetadataRoute } from "next";
import { i18n } from "@/i18n/config";
import { buildLanguageAlternates, buildLocalizedUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return i18n.locales.flatMap((lang) => [
    {
      url: buildLocalizedUrl(lang),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: buildLanguageAlternates(),
      },
    },
    {
      url: buildLocalizedUrl(lang, "/about"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: buildLanguageAlternates("/about"),
      },
    },
  ]);
}
