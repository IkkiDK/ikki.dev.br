import Link from "next/link";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { formatPeriod, type WorkEntry } from "@/lib/work";

export function WorkRow({
  entry,
  locale,
  dict,
}: {
  entry: WorkEntry;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <li className="border-t">
      <Link
        href={`/${locale}/work/${entry.slug}`}
        className="group grid gap-x-8 gap-y-2 py-8 md:grid-cols-[9rem_minmax(0,1fr)]"
      >
        <p className="font-[family-name:var(--font-display)] text-[0.85rem] text-[var(--fg-faint)] md:pt-1.5">
          {formatPeriod(entry, dict.work.present)}
        </p>

        <div className="min-w-0">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold transition-colors group-hover:text-[var(--accent-ink)]">
            {entry.title[locale]}
          </h3>
          <p className="mt-1 text-[1.05rem] text-[var(--fg-muted)]">{entry.tagline[locale]}</p>
          <p className="mt-3 max-w-[64ch] text-[0.98rem] leading-relaxed">{entry.summary[locale]}</p>

          <p className="mt-4 max-w-[64ch] text-[0.85rem] text-[var(--fg-faint)]">
            <span className="text-[var(--fg-muted)]">{dict.work.stackLabel}:</span>{" "}
            {entry.stack.join(", ")}
          </p>

          <p className="mt-4 inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-[0.88rem] text-[var(--accent-ink)]">
            <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-[var(--accent)]">
              {dict.work.read}
            </span>
            <span
              aria-hidden="true"
              className="inline-block h-px w-5 bg-[var(--accent)] transition-all group-hover:w-8"
            />
          </p>
        </div>
      </Link>
    </li>
  );
}
