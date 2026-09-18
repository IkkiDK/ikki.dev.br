import { site } from "@/lib/site";

const BACKGROUND = "#14181D";
const FOREGROUND = "#F2F4F3";
const MUTED = "#9AA6B0";
const ACCENT = "#F0B429";

/** One 1200×630 layout for every Open Graph image, so each share looks like the same site. */
export function OgCard({ title, subtitle, note }: { title: string; subtitle?: string; note: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: BACKGROUND,
        color: FOREGROUND,
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 22, height: 22, borderRadius: 11, background: ACCENT }} />
        <div style={{ fontSize: 28, color: MUTED }}>{site.domain}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 960 }}>
        <div
          style={{
            display: "flex",
            fontSize: subtitle ? 60 : 68,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div style={{ display: "flex", fontSize: 34, lineHeight: 1.3, color: MUTED }}>{subtitle}</div>
        ) : null}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
        <div style={{ display: "flex" }}>{site.author}</div>
        <div style={{ display: "flex", color: MUTED }}>{note}</div>
      </div>
    </div>
  );
}
