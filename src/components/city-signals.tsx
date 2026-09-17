"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n";

const STEP_MS = 1900;
const HUB = { x: 330, y: 230 };
const GRID_X = [60, 180, 250, 330, 400, 480, 560];
const GRID_Y = [70, 150, 230, 310, 390];

type Source = {
  x: number;
  y: number;
  /** Orthogonal route along the streets to the hub. */
  route: string;
  fleet?: boolean;
  anchor: "start" | "middle" | "end";
  labelDy: number;
};

/** Sources sit on street crossings, in the same order as dict.signals.nodes. */
const SOURCES: Source[] = [
  { x: 60, y: 70, route: "M60 70 H180 V230 H330", anchor: "start", labelDy: 22 },
  { x: 560, y: 70, route: "M560 70 V150 H400 V230 H330", anchor: "end", labelDy: 22 },
  { x: 560, y: 230, route: "M560 230 H480 V310 H400 V230 H330", anchor: "end", labelDy: 22 },
  { x: 60, y: 310, route: "M60 310 H250 V230 H330", anchor: "start", labelDy: 22 },
  { x: 480, y: 390, route: "M480 390 H400 V310 H330 V230", anchor: "middle", labelDy: 20 },
  { x: 250, y: 390, route: "M250 390 V310 H330 V230", anchor: "middle", labelDy: 20 },
  { x: 180, y: 150, route: "M180 150 H250 V230 H330", fleet: true, anchor: "start", labelDy: -14 },
];

const IDLE = "#4b5661";
const LABEL = "#9aa6b0";

export function CitySignals({ signals }: { signals: Dictionary["signals"] }) {
  const [active, setActive] = useState<number | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let index = 0;
    setActive(0);
    const id = setInterval(() => {
      index = (index + 1) % SOURCES.length;
      setActive(index);
      setTick((t) => t + 1);
    }, STEP_MS);
    return () => clearInterval(id);
  }, []);

  const current = active === null ? null : signals.nodes[active];

  return (
    <figure className="w-full">
      <svg viewBox="0 0 600 420" role="img" aria-label={signals.label} className="h-auto w-full">
        <g stroke="rgba(242,244,243,0.14)" strokeWidth="1">
          {GRID_Y.map((y) => (
            <line key={`h${y}`} x1="40" y1={y} x2="580" y2={y} />
          ))}
          {GRID_X.map((x) => (
            <line key={`v${x}`} x1={x} y1="50" x2={x} y2="405" />
          ))}
        </g>

        {active !== null ? (
          <path
            key={`route-${active}-${tick}`}
            d={SOURCES[active].route}
            pathLength={1}
            className="signal-live"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}

        {SOURCES.map((source, index) => {
          const node = signals.nodes[index];
          const lit = active === null || active === index;
          const fill = lit ? "var(--accent)" : IDLE;
          return (
            <g key={node.key}>
              {active === index ? (
                <circle
                  key={`pulse-${tick}`}
                  cx={source.x}
                  cy={source.y}
                  r="6"
                  className="signal-pulse"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                />
              ) : null}
              {source.fleet ? (
                <rect x={source.x - 6} y={source.y - 6} width="12" height="12" rx="2.5" fill={fill} />
              ) : (
                <circle cx={source.x} cy={source.y} r="6" fill={fill} />
              )}
              <text
                x={source.x}
                y={source.y + source.labelDy}
                textAnchor={source.anchor}
                fill={LABEL}
                fontSize="12.5"
                className="font-[family-name:var(--font-display)]"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        <g>
          {active !== null ? (
            <circle
              key={`arrive-${tick}`}
              cx={HUB.x}
              cy={HUB.y}
              r="8"
              className="signal-arrive"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
          ) : null}
          <circle cx={HUB.x} cy={HUB.y} r="22" fill="rgba(240,180,41,0.16)" />
          <circle cx={HUB.x} cy={HUB.y} r="8" fill="var(--accent)" />
          <text
            x={HUB.x}
            y={HUB.y - 24}
            textAnchor="middle"
            fill="#e6ebe9"
            fontSize="12.5"
            className="font-[family-name:var(--font-display)]"
          >
            {signals.hub}
          </text>
        </g>
      </svg>

      <figcaption className="mt-3 flex min-h-6 items-center gap-2.5 text-[0.85rem] text-[#9aa6b0]">
        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
        {current ? (
          <>
            <span className="font-[family-name:var(--font-mono)] text-[0.8rem] text-[#e6ebe9]">
              {current.event}
            </span>
            <span>— {current.label}</span>
          </>
        ) : (
          <span>{signals.caption}</span>
        )}
      </figcaption>
    </figure>
  );
}
