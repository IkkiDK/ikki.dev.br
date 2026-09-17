"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

const shortLabel: Record<Locale, string> = { en: "EN", pt: "PT" };

export function LocaleSwitch({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div className="flex items-center gap-1 text-sm" role="group" aria-label={label}>
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={`/${locale}${rest ? `/${rest}` : ""}`}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            className={
              active
                ? "rounded px-1.5 py-0.5 font-[family-name:var(--font-display)] font-semibold text-[var(--fg)]"
                : "rounded px-1.5 py-0.5 font-[family-name:var(--font-display)] text-[var(--fg-faint)] transition-colors hover:text-[var(--fg)]"
            }
          >
            {shortLabel[locale]}
          </Link>
        );
      })}
    </div>
  );
}
