import Link from "next/link";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export default function LocaleNotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-32">
      <h1 className="text-[clamp(2.2rem,5vw,3.2rem)] font-semibold tracking-[-0.03em]">
        {dict.notFound.title}
      </h1>
      <p className="mt-4 max-w-[52ch] text-[1.05rem] text-[var(--fg-muted)]">{dict.notFound.body}</p>
      <Link
        href={`/${defaultLocale}/work`}
        className="mt-8 inline-block rounded-full bg-[var(--btn-bg)] px-5 py-2.5 font-[family-name:var(--font-display)] text-[0.92rem] text-[var(--btn-fg)] transition-opacity hover:opacity-85"
      >
        {dict.notFound.cta}
      </Link>
    </div>
  );
}
