import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import { ogImage } from "@/lib/metadata";
import { site } from "@/lib/site";

export const size = { width: ogImage.width, height: ogImage.height };
export const contentType = "image/png";
export const alt = ogImage.alt;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14181D",
          color: "#F2F4F3",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 22, height: 22, borderRadius: 11, background: "#F0B429" }} />
          <div style={{ fontSize: 28, color: "#9AA6B0" }}>{site.domain}</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            maxWidth: 940,
          }}
        >
          {dict.hero.headline}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
          <div style={{ display: "flex" }}>{site.author}</div>
          <div style={{ display: "flex", color: "#9AA6B0" }}>Go &amp; React</div>
        </div>
      </div>
    ),
    size,
  );
}
