import { translations } from "./translations";

export function getTranslations(locale: string | undefined) {
  return translations[locale as keyof typeof translations] || translations.en;
}
