import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { OgCard } from "@/components/og-card";
import { isLocale, locales } from "@/i18n/config";
import { ogImage } from "@/lib/metadata";
import { getWork, work } from "@/lib/work";

export const size = { width: ogImage.width, height: ogImage.height };
export const contentType = "image/png";
export const alt = ogImage.alt;

/** Enough of the stack to place the project, few enough to stay on one line. */
const STACK_ITEMS_SHOWN = 3;

export function generateStaticParams() {
  return locales.flatMap((locale) => work.map((entry) => ({ locale, slug: entry.slug })));
}

export default async function CaseStudyImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const entry = getWork(slug);
  if (!isLocale(locale) || !entry) notFound();

  return new ImageResponse(
    (
      <OgCard
        title={entry.title[locale]}
        subtitle={entry.tagline[locale]}
        note={entry.stack.slice(0, STACK_ITEMS_SHOWN).join(" · ")}
      />
    ),
    size,
  );
}
