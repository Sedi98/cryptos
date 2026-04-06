import type { Locale } from "@/i18n/config";
import { i18n } from "@/i18n/config";

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/+$/, "")}`;
  }

  return "http://localhost:3000";
}

export function getLanguageTag(locale: Locale) {
  switch (locale) {
    case "az":
      return "az-AZ";
    case "ru":
      return "ru-RU";
    default:
      return "en-US";
  }
}

export function getOpenGraphLocale(locale: Locale) {
  switch (locale) {
    case "az":
      return "az_AZ";
    case "ru":
      return "ru_RU";
    default:
      return "en_US";
  }
}

export function getOpenGraphAlternateLocales(locale: Locale) {
  return i18n.locales
    .filter((value) => value !== locale)
    .map((value) => getOpenGraphLocale(value));
}

export function buildLocalizedUrl(locale: Locale, path = "") {
  const normalizedPath = path ? `/${path.replace(/^\/+/, "")}` : "";
  return `${getSiteUrl()}/${locale}${normalizedPath}`;
}

export function buildLanguageAlternates(path = "") {
  const alternates = i18n.locales.map((locale) => [locale, buildLocalizedUrl(locale, path)]);

  alternates.push(["x-default", buildLocalizedUrl(i18n.defaultLocale, path)]);

  return Object.fromEntries(alternates);
}
