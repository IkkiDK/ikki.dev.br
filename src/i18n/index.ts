import { en } from "./en";
import { pt } from "./pt";
import type { Locale } from "./config";
import type { Dictionary } from "./en";

const dictionaries: Record<Locale, Dictionary> = { en, pt };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
