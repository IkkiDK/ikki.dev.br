import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";
import { site } from "@/lib/site";

const PERMANENT_REDIRECT = 308;

export function proxy(request: NextRequest) {
  /** One canonical host, so search engines never index the site twice. */
  if (request.headers.get("host") === `www.${site.domain}`) {
    const canonical = request.nextUrl.clone();
    canonical.host = site.domain;
    canonical.port = "";
    return NextResponse.redirect(canonical, PERMANENT_REDIRECT);
  }

  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  /**
   * A locale-less path always lands on the default locale; the header switch covers
   * everyone else. Permanent, so crawlers fold "/" into "/pt" instead of indexing both.
   */
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, PERMANENT_REDIRECT);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\.).*)"],
};
