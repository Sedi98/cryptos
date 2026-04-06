import "server-only";
import { i18n, type Locale } from "@/i18n/config";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  az: () => import("./dictionaries/az.json").then((module) => module.default),
  ru: () => import("./dictionaries/ru.json").then((module) => module.default),
};

export const hasLocale = (locale: string): locale is Locale => {
  return i18n.locales.includes(locale as Locale);
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
