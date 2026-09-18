import type { Metadata } from "next";
import { Archivo, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Analytics } from "@/components/analytics";
import { PersonSchema } from "@/components/person-schema";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeScript } from "@/components/theme-script";
import { getDictionary } from "@/i18n";
import { htmlLang, isLocale, locales, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import "../globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    ...pageMetadata({ locale, path: "", title: dict.meta.title, description: dict.meta.description }),
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s — ${site.shortName}` },
    authors: [{ name: site.author, url: site.url }],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typed: Locale = locale;
  const dict = getDictionary(typed);

  return (
    <html
      lang={htmlLang[typed]}
      suppressHydrationWarning
      className={`${archivo.variable} ${sourceSerif.variable} ${jetbrains.variable}`}
    >
      <head>
        <ThemeScript />
        <PersonSchema jobTitle={dict.meta.jobTitle} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-[var(--panel)] focus:px-4 focus:py-2 focus:text-[var(--panel-fg)]"
        >
          {dict.nav.skip}
        </a>
        <SiteHeader locale={typed} dict={dict} />
        <main id="main">{children}</main>
        <SiteFooter dict={dict} />
        <Analytics />
      </body>
    </html>
  );
}
