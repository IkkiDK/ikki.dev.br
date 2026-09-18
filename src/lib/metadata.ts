import type { Metadata } from "next";
import { defaultLocale, htmlLang, type Locale } from "@/i18n/config";
import { site } from "@/lib/site";

/** Shared with the opengraph-image route, which renders at exactly this size. */
export const ogImage = { width: 1200, height: 630, alt: site.author } as const;

/**
 * Every page declares its own canonical, hreflang set and Open Graph URL. Next merges
 * `alternates` and `openGraph` shallowly, so a page that set only its title would inherit
 * the layout's canonical and tell search engines it duplicates the home page. Setting
 * `openGraph` also drops the file-based image from the parent segment, so it is named here.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  /** Route below the locale segment, "" for the locale home. */
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        en: `/en${path}`,
        "pt-BR": `/pt${path}`,
        "x-default": `/${defaultLocale}${path}`,
      },
    },
    openGraph: {
      type: "website",
      url: `${site.url}/${locale}${path}`,
      siteName: site.shortName,
      title,
      description,
      locale: htmlLang[locale].replace("-", "_"),
      images: [{ url: `/${locale}/opengraph-image`, ...ogImage }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
