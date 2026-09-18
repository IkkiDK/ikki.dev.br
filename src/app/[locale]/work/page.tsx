import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkRow } from "@/components/work-row";
import { getDictionary } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import { work } from "@/lib/work";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "/work", title: dict.work.title, description: dict.work.intro });
}

export default async function WorkPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pt-20 sm:pt-24">
      <h1 className="text-[clamp(2.2rem,5vw,3.2rem)] font-semibold tracking-[-0.03em]">
        {dict.work.title}
      </h1>
      <p className="mt-5 max-w-[60ch] text-[1.1rem] leading-relaxed text-[var(--fg-muted)]">
        {dict.work.intro}
      </p>

      <ul className="mt-12">
        {work.map((entry) => (
          <WorkRow key={entry.slug} entry={entry} locale={locale} dict={dict} />
        ))}
      </ul>
    </div>
  );
}
