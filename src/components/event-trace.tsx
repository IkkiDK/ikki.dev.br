"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { JsonHighlight } from "@/components/json-highlight";
import type { Dictionary } from "@/i18n";

const STEP_MS = 1150;

type Step = Dictionary["trace"]["steps"][number];

export function EventTrace({ trace }: { trace: Dictionary["trace"] }) {
  const steps: Step[] = trace.steps;
  const last = steps.length - 1;

  const [active, setActive] = useState(last);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const play = useCallback(() => {
    stop();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(last);
      setRunning(false);
      return;
    }

    setRunning(true);
    setActive(0);

    let step = 0;
    const advance = () => {
      step += 1;
      if (step > last) {
        setRunning(false);
        timer.current = null;
        return;
      }
      setActive(step);
      timer.current = setTimeout(advance, STEP_MS);
    };
    timer.current = setTimeout(advance, STEP_MS);
  }, [last, stop]);

  useEffect(() => {
    play();
    return stop;
  }, [play, stop]);

  function jumpTo(index: number) {
    stop();
    setRunning(false);
    setActive(index);
  }

  const current = steps[active];

  return (
    <section
      aria-label={trace.title}
      className="overflow-hidden rounded-xl bg-[var(--panel)] text-[var(--panel-fg)] ring-1 ring-[var(--panel-ring)] shadow-[0_24px_60px_-32px_rgba(20,24,29,0.55)]"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-white/10 px-6 py-5 sm:px-7">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--panel-fg)]">
            {trace.title}
          </h2>
          <p className="mt-1 max-w-[52ch] text-[0.92rem] leading-relaxed text-[#9aa6b0]">
            {trace.caption}
          </p>
        </div>

        <button
          type="button"
          onClick={play}
          disabled={running}
          className="shrink-0 rounded-full border border-white/15 px-4 py-1.5 font-[family-name:var(--font-display)] text-[0.82rem] text-[#e6ebe9] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:cursor-default disabled:border-white/10 disabled:text-[#6e7b85]"
        >
          {running ? trace.running : trace.replay}
        </button>
      </div>

      <div className="grid gap-px bg-white/10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <ol className="bg-[var(--panel)] px-6 py-6 sm:px-7">
          {steps.map((step, index) => {
            const done = index < active;
            const isCurrent = index === active;
            return (
              <li key={step.key} className="relative flex gap-4 pb-4 last:pb-0">
                {index < last ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-4 bottom-0 w-px"
                    style={{ background: done ? "var(--accent)" : "rgba(255,255,255,0.14)" }}
                  />
                ) : null}

                <span
                  aria-hidden="true"
                  className="relative z-10 mt-[5px] size-[15px] shrink-0 rounded-full border-2 transition-colors"
                  style={{
                    borderColor: done || isCurrent ? "var(--accent)" : "rgba(255,255,255,0.28)",
                    background: done ? "var(--accent)" : "var(--panel)",
                    boxShadow: isCurrent ? "0 0 0 5px rgba(240,180,41,0.18)" : undefined,
                  }}
                />

                <button
                  type="button"
                  onClick={() => jumpTo(index)}
                  className="-my-1 min-w-0 flex-1 rounded py-1 text-left"
                  aria-current={isCurrent ? "step" : undefined}
                >
                  <span
                    className="block font-[family-name:var(--font-display)] text-[0.95rem] font-medium transition-colors"
                    style={{ color: isCurrent || done ? "var(--panel-fg)" : "#6e7b85" }}
                  >
                    {step.label}
                  </span>
                  <span
                    className="mt-0.5 block max-w-[46ch] text-[0.86rem] leading-snug transition-colors"
                    style={{ color: isCurrent ? "#9aa6b0" : "#5f6b75" }}
                  >
                    {step.note}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="bg-[#0b0f13] px-6 py-6 sm:px-7">
          <p className="mb-3 text-[0.78rem] text-[#5f6b75]">
            {trace.payloadLabel} — {trace.stageLabel} {active + 1}/{steps.length}
          </p>
          <pre className="min-h-[14rem] overflow-x-auto font-[family-name:var(--font-mono)] text-[0.8rem] leading-[1.9] text-[#c8d1d6]">
            <code>
              <JsonHighlight source={current.payload} />
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
