import type { Dictionary } from "@/i18n";
import { site } from "@/lib/site";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-8 text-[0.85rem] text-[var(--fg-faint)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          {"©"} {new Date().getFullYear()} {site.author}
        </p>
        <p>
          {dict.footer.builtWith}{" "}
          <a href={site.repo} className="underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:text-[var(--fg)]">
            {dict.footer.source}
          </a>
        </p>
      </div>
    </footer>
  );
}
