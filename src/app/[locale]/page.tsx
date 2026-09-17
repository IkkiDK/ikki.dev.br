import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CitySignals } from "@/components/city-signals";
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
      <section className="border-b border-white/10 bg-[var(--hero-bg)] text-[var(--hero-fg)]">
        <div className="mx-auto grid w-full max-w-5xl gap-x-12 gap-y-12 px-6 pb-16 pt-16 sm:pt-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
          <div className="min-w-0">
            <div className="mb-9 flex items-center gap-4">
              <Image
                src="/henrique-kasprzak.jpg"
                alt={dict.hero.photoAlt}
                width={64}
                height={64}
                priority
                className="size-16 rounded-full object-cover ring-2 ring-white/15"
              />
              <div>
                <p className="font-[family-name:var(--font-display)] text-[1.05rem] font-semibold leading-tight">
                  {dict.hero.name}
                </p>
                <p className="mt-0.5 text-[0.92rem] text-[#9aa6b0]">{dict.hero.role}</p>
              </div>
            </div>

            <h1 className="max-w-[19ch] text-[clamp(2.3rem,5vw,3.7rem)] font-semibold leading-[1.02] tracking-[-0.025em] [font-stretch:108%]">
              {dict.hero.headline}
            </h1>

            <p className="mt-7 max-w-[56ch] text-[1.1rem] leading-[1.7] text-[#9aa6b0]">
              {dict.hero.intro}
            </p>

            <p className="mt-6 flex items-center gap-2.5 text-[0.95rem] text-[#9aa6b0]">
              <span aria-hidden="true" className="size-2 rounded-full bg-live" />
              {dict.hero.availability}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={`/${locale}/work`}
                className="rounded-full bg-[var(--accent)] px-5 py-2.5 font-[family-name:var(--font-display)] text-[0.92rem] font-medium text-[#14181d] transition-opacity hover:opacity-90"
              >
                {dict.hero.workCta}
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp.number}`}
                className="rounded-full border border-white/20 px-5 py-2.5 font-[family-name:var(--font-display)] text-[0.92rem] text-[var(--hero-fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {dict.hero.whatsappCta}
              </a>
            </div>
          </div>

          <CitySignals signals={dict.signals} />
        </div>
      </section>

      <section className="border-b">
        <dl className="mx-auto grid w-full max-w-5xl gap-x-8 gap-y-5 px-6 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {dict.hero.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-[family-name:var(--font-display)] text-[0.78rem] text-[var(--fg-faint)]">
                {fact.label}
              </dt>
              <dd className="mt-0.5 text-[0.95rem] leading-snug">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mx-auto w-full max-w-5xl px-6 pt-14">
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
