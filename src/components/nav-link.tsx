"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="relative py-1 font-[family-name:var(--font-display)] text-[0.95rem] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)] aria-[current=page]:text-[var(--fg)]"
    >
      {children}
      {active ? (
        <span aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[var(--accent)]" />
      ) : null}
    </Link>
  );
}
