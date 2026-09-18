import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "/about", title: dict.about.title, description: dict.about.lede });
}

export default async function AboutPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pt-20 sm:pt-24">
      <h1 className="text-[clamp(2.2rem,5vw,3.2rem)] font-semibold tracking-[-0.03em]">
        {dict.about.title}
      </h1>
      <p className="mt-5 max-w-[46ch] text-[1.28rem] leading-[1.45] text-[var(--fg-muted)]">
        {dict.about.lede}
      </p>

      <div className="mt-12 max-w-[68ch] space-y-6 text-[1.05rem] leading-[1.75]">
        {dict.about.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="text-[1.6rem] font-semibold">{dict.about.skillsTitle}</h2>
        <dl className="mt-8 grid gap-x-12 gap-y-7 sm:grid-cols-2">
          {dict.about.skills.map((group) => (
            <div key={group.name}>
              <dt className="font-[family-name:var(--font-display)] text-[0.85rem] text-[var(--fg-faint)]">
                {group.name}
              </dt>
              <dd className="mt-1.5 text-[0.98rem] leading-relaxed">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-20 grid gap-12 sm:grid-cols-2">
        <div>
          <h2 className="text-[1.6rem] font-semibold">{dict.about.educationTitle}</h2>
          {dict.about.education.map((item) => (
            <div key={item.school} className="mt-6">
              <p className="font-[family-name:var(--font-display)] font-medium">{item.school}</p>
              <p className="text-[var(--fg-muted)]">{item.degree}</p>
              <p className="text-[0.9rem] text-[var(--fg-faint)]">{item.period}</p>
            </div>
          ))}

          <h2 className="mt-12 text-[1.6rem] font-semibold">{dict.about.languagesTitle}</h2>
          <dl className="mt-6 space-y-2">
            {dict.about.languages.map((language) => (
              <div key={language.name} className="flex flex-wrap gap-x-2">
                <dt className="font-[family-name:var(--font-display)] font-medium">
                  {language.name}
                </dt>
                <dd className="text-[var(--fg-muted)]">{language.level}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="text-[1.6rem] font-semibold">{dict.about.coursesTitle}</h2>
          <ul className="mt-6 space-y-2.5">
            {dict.about.courses.map((course) => (
              <li key={course} className="relative pl-6 leading-relaxed">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[0.72em] h-px w-3 bg-[var(--accent)]"
                />
                {course}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-20 border-t pt-10">
        <h2 className="text-[1.6rem] font-semibold">{dict.contact.title}</h2>
        <p className="mt-3 max-w-[56ch] text-[var(--fg-muted)]">{dict.contact.body}</p>

        <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ContactItem label={dict.contact.emailLabel} href={`mailto:${site.email}`} value={site.email} />
          <ContactItem
            label={dict.contact.whatsappLabel}
            href={`https://wa.me/${site.whatsapp.number}`}
            value={site.whatsapp.display}
            event="cta_whatsapp"
          />
          <ContactItem label={dict.contact.githubLabel} href={site.github} value={site.githubHandle} />
          <ContactItem label={dict.contact.linkedinLabel} href={site.linkedin} value={site.linkedinHandle} />
          <ContactItem
            label={dict.contact.resumeLabel}
            href={site.resume[locale]}
            value={dict.contact.resumeNote}
            event="resume_download"
          />
        </dl>
      </section>
    </div>
  );
}

function ContactItem({
  label,
  href,
  value,
  event,
}: {
  label: string;
  href: string;
  value: string;
  event?: string;
}) {
  return (
    <div>
      <dt className="font-[family-name:var(--font-display)] text-[0.8rem] text-[var(--fg-faint)]">
        {label}
      </dt>
      <dd className="mt-1">
        <a
          href={href}
          data-event={event}
          className="break-words underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
        >
          {value}
        </a>
      </dd>
    </div>
  );
}
