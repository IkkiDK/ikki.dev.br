import Link from "next/link";
import { notFound } from "next/navigation";
import { EventTrace } from "@/components/event-trace";
import { WorkRow } from "@/components/work-row";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { site } from "@/lib/site";
import { work } from "@/lib/work";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <section className="mx-auto grid w-full max-w-5xl gap-x-14 gap-y-12 px-6 pb-14 pt-20 sm:pt-28 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="min-w-0">
          <h1 className="max-w-[19ch] text-[clamp(2.4rem,6.4vw,4.1rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            {dict.hero.headline}
          </h1>

          <p className="mt-8 max-w-[62ch] text-[1.12rem] leading-[1.7] text-[var(--fg-muted)]">
            {dict.hero.intro}
          </p>

          <p className="mt-6 flex items-center gap-2.5 text-[0.95rem] text-[var(--fg-muted)]">
            <span aria-hidden="true" className="size-2 rounded-full bg-[var(--live-ink)]" />
            {dict.hero.availability}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={`/${locale}/work`}
              className="rounded-full bg-[var(--btn-bg)] px-5 py-2.5 font-[family-name:var(--font-display)] text-[0.92rem] text-[var(--btn-fg)] transition-opacity hover:opacity-85"
            >
              {dict.hero.workCta}
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border px-5 py-2.5 font-[family-name:var(--font-display)] text-[0.92rem] transition-colors hover:border-[var(--accent)]"
            >
              {dict.hero.emailCta}
            </a>
          </div>
        </div>

        <dl className="self-start lg:pt-3">
          {dict.hero.facts.map((fact) => (
            <div key={fact.label} className="border-t py-3.5 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-3.5">
              <dt className="font-[family-name:var(--font-display)] text-[0.78rem] text-[var(--fg-faint)]">
                {fact.label}
              </dt>
              <dd className="mt-0.5 text-[0.95rem] leading-snug">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mx-auto w-full max-w-5xl px-6 pb-8">
        <EventTrace trace={dict.trace} />
      </div>

      <section className="mx-auto w-full max-w-5xl px-6 pb-4 pt-16">
        <h2 className="text-[clamp(1.8rem,3.4vw,2.4rem)] font-semibold">{dict.work.title}</h2>
        <p className="mt-3 max-w-[64ch] text-[1.02rem] text-[var(--fg-muted)]">{dict.work.intro}</p>

        <ul className="mt-10">
          {work.map((entry) => (
            <WorkRow key={entry.slug} entry={entry} locale={locale} dict={dict} />
          ))}
        </ul>
      </section>
    </>
  );
}
