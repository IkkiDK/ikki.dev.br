import type { ReactNode } from "react";

/** The real document shell lives in app/[locale]/layout.tsx, which knows the language. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
