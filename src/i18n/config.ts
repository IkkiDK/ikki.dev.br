export const locales = ["en", "pt"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const localeNames: Record<Locale, string> = {
  en: "English",
  pt: "Português",
};

export const htmlLang: Record<Locale, string> = {
  en: "en",
  pt: "pt-BR",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
