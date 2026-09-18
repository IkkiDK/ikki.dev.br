"use client";

import Script from "next/script";
import { useEffect } from "react";
import { site } from "@/lib/site";

/** Any element carrying this attribute reports a click under that event name. */
const EVENT_ATTRIBUTE = "data-event";
const LABEL_ATTRIBUTE = "data-event-label";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  useEffect(() => {
    function report(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const source = event.target.closest(`[${EVENT_ATTRIBUTE}]`);
      const name = source?.getAttribute(EVENT_ATTRIBUTE);
      if (!name) return;
      const label = source?.getAttribute(LABEL_ATTRIBUTE);
      window.gtag?.("event", name, label ? { label } : undefined);
    }
    document.addEventListener("click", report);
    return () => document.removeEventListener("click", report);
  }, []);

  /** Local runs never reach the property, so dev traffic cannot pollute the numbers. */
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${site.analyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.analyticsId}');`}
      </Script>
    </>
  );
}
