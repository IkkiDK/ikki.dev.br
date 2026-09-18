import { ImageResponse } from "next/og";
import { OgCard } from "@/components/og-card";
import { getDictionary } from "@/i18n";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { ogImage } from "@/lib/metadata";

export const size = { width: ogImage.width, height: ogImage.height };
export const contentType = "image/png";
export const alt = ogImage.alt;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);

  return new ImageResponse(<OgCard title={dict.hero.headline} note="Go & React" />, size);
}
