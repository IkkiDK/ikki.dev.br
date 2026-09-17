import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import { formatPeriod, getWork, work } from "@/lib/work";

export function generateStaticParams() {
  return locales.flatMap((locale) => work.map((entry) => ({ locale, slug: entry.slug })));
}

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const entry = getWork(slug);
  if (!isLocale(locale) || !entry) return {};

  return {
    title: `${entry.title[locale]} — ${entry.tagline[locale]}`,
    description: entry.summary[locale],
    alternates: {
      canonical: `/${locale}/work/${slug}`,
      languages: { en: `/en/work/${slug}`, "pt-BR": `/pt/work/${slug}` },
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { locale, slug } = await params;
  const entry = getWork(slug);
  if (!isLocale(locale) || !entry) notFound();

  const dict = getDictionary(locale);
  const { default: Body } = await import(`../../../../content/work/${slug}/${locale}.mdx`);

  const index = work.findIndex((item) => item.slug === slug);
  const next = work[(index + 1) % work.length];

  return (
    <article className="mx-auto w-full max-w-[44rem] px-6 pt-14 sm:pt-20">
      <Link
        href={`/${locale}/work`}
        className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-[0.88rem] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
      >
        <span aria-hidden="true" className="inline-block h-px w-5 bg-[var(--line-strong)]" />
        {dict.ui.backToWork}
      </Link>

      <header className="mt-8 border-b pb-10">
        <p className="font-[family-name:var(--font-display)] text-[0.88rem] text-[var(--fg-faint)]">
          {formatPeriod(entry, dict.work.present)}
        </p>
        <h1 className="mt-2 text-[clamp(2.2rem,5.2vw,3.4rem)] font-semibold tracking-[-0.03em]">
          {entry.title[locale]}
        </h1>
        <p className="mt-3 max-w-[48ch] text-[1.3rem] leading-[1.35] text-[var(--fg-muted)]">
          {entry.tagline[locale]}
        </p>

        <dl className="mt-9 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="font-[family-name:var(--font-display)] text-[0.8rem] text-[var(--fg-faint)]">
              {dict.work.roleLabel}
            </dt>
            <dd className="mt-1">{entry.role[locale]}</dd>
          </div>
          <div>
            <dt className="font-[family-name:var(--font-display)] text-[0.8rem] text-[var(--fg-faint)]">
              {dict.work.stackLabel}
            </dt>
            <dd className="mt-1">{entry.stack.join(", ")}</dd>
          </div>
        </dl>

        {entry.links.length > 0 ? (
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            {entry.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-[family-name:var(--font-display)] text-[0.9rem] text-[var(--accent-ink)] underline decoration-[var(--accent)] underline-offset-4"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="mt-14">
        <Body />
      </div>

      <nav className="mt-24 border-t pt-8">
        <Link href={`/${locale}/work/${next.slug}`} className="group block">
          <span className="font-[family-name:var(--font-display)] text-[0.8rem] text-[var(--fg-faint)]">
            {dict.work.read}
          </span>
          <span className="mt-1 block font-[family-name:var(--font-display)] text-xl font-semibold transition-colors group-hover:text-[var(--accent-ink)]">
            {next.title[locale]}
          </span>
        </Link>
      </nav>
    </article>
  );
}
