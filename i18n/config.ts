export const i18n = {
  locales: ["en", "az", "ru"] as const,
  defaultLocale: "az" as const,
};

export type Locale = (typeof i18n.locales)[number];
