import { Fragment, type ReactNode } from "react";

const TOKEN = /("(?:[^"\\]|\\.)*"\s*:)|("(?:[^"\\]|\\.)*")|(-?\d+(?:\.\d+)?)|(true|false|null)/g;

const CLASS = {
  key: "text-[var(--code-key)]",
  string: "text-[var(--code-string)]",
  number: "text-[var(--code-number)]",
  literal: "text-[var(--code-number)]",
};

/** Colours a JSON snippet. The input is authored content, never user data. */
export function JsonHighlight({ source }: { source: string }): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  let index = 0;

  for (const match of source.matchAll(TOKEN)) {
    const start = match.index;
    if (start > last) out.push(<Fragment key={index++}>{source.slice(last, start)}</Fragment>);

    const [text, keyTok, stringTok, numberTok] = match;
    const className = keyTok
      ? CLASS.key
      : stringTok
        ? CLASS.string
        : numberTok
          ? CLASS.number
          : CLASS.literal;

    out.push(
      <span key={index++} className={className}>
        {text}
      </span>,
    );
    last = start + text.length;
  }

  if (last < source.length) out.push(<Fragment key={index++}>{source.slice(last)}</Fragment>);
  return out;
}
