import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { site } from "@/lib/site";
import { work } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/work", "/about", ...work.map((entry) => `/work/${entry.slug}`)];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.url}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
