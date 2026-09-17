import Link from "next/link";
import { LocaleSwitch } from "@/components/locale-switch";
import { NavLink } from "@/components/nav-link";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <header className="sticky top-0 z-50 border-b bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex min-h-16 w-full max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-3">
        <Link
          href={`/${locale}`}
          className="font-[family-name:var(--font-display)] text-[0.95rem] font-semibold tracking-tight"
        >
          {dict.hero.name}
        </Link>

        <div className="flex items-center gap-4 sm:gap-5">
          <nav aria-label={dict.nav.home} className="flex items-center gap-4 sm:gap-5">
            <NavLink href={`/${locale}/work`}>{dict.nav.work}</NavLink>
            <NavLink href={`/${locale}/about`}>{dict.nav.about}</NavLink>
            <a
              href={site.resume[locale]}
              className="py-1 font-[family-name:var(--font-display)] text-[0.95rem] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
            >
              {dict.nav.resume}
            </a>
          </nav>

          <span aria-hidden="true" className="hidden h-5 w-px bg-[var(--line)] sm:block" />

          <div className="flex items-center gap-2">
            <LocaleSwitch current={locale} label={dict.ui.languageLabel} />
            <ThemeToggle toDark={dict.ui.toggleTheme} toLight={dict.ui.toggleThemeLight} />
          </div>
        </div>
      </div>
    </header>
  );
}
