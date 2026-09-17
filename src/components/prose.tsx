import type { MDXComponents } from "mdx/types";

export const proseComponents: MDXComponents = {
  h2: (props) => (
    <h2
      {...props}
      className="mt-16 max-w-[34ch] scroll-mt-24 text-[1.72rem] font-semibold leading-tight first:mt-0"
    />
  ),
  h3: (props) => (
    <h3 {...props} className="mt-10 max-w-[44ch] scroll-mt-24 text-[1.18rem] font-semibold" />
  ),
  p: (props) => <p {...props} className="mt-5 max-w-[68ch] leading-[1.72]" />,
  ul: (props) => <ul {...props} className="mt-5 max-w-[68ch] space-y-2.5 pl-0" />,
  ol: (props) => <ol {...props} className="mt-5 max-w-[68ch] list-decimal space-y-2.5 pl-6" />,
  li: (props) => (
    <li
      {...props}
      className="relative pl-6 leading-[1.7] marker:text-[var(--fg-faint)] [ol>&]:pl-0 [ul>&]:before:absolute [ul>&]:before:left-0 [ul>&]:before:top-[0.72em] [ul>&]:before:h-px [ul>&]:before:w-3 [ul>&]:before:bg-[var(--accent)]"
    />
  ),
  a: (props) => (
    <a
      {...props}
      className="underline decoration-[var(--line-strong)] underline-offset-[3px] transition-colors hover:decoration-[var(--accent)]"
    />
  ),
  strong: (props) => <strong {...props} className="font-semibold text-[var(--fg)]" />,
  hr: (props) => <hr {...props} className="my-14 max-w-[68ch] border-t" />,
  blockquote: (props) => (
    <blockquote
      {...props}
      className="mt-7 max-w-[62ch] border-l-2 border-[var(--accent)] pl-5 text-[var(--fg-muted)] italic"
    />
  ),
  code: (props) => (
    <code
      {...props}
      className="rounded bg-[var(--bg-raised)] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.85em] text-[var(--fg)] ring-1 ring-[var(--line)]"
    />
  ),
  pre: (props) => (
    <pre
      {...props}
      className="mt-6 overflow-x-auto rounded-lg bg-[var(--panel)] p-5 font-[family-name:var(--font-mono)] text-[0.8rem] leading-[1.7] text-[#c8d1d6] [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit [&_code]:ring-0"
    />
  ),
  table: (props) => (
    <div className="mt-7 max-w-[72ch] overflow-x-auto">
      <table {...props} className="w-full border-collapse text-[0.94rem]" />
    </div>
  ),
  th: (props) => (
    <th
      {...props}
      className="border-b-2 border-[var(--line-strong)] py-2.5 pr-6 text-left align-top font-[family-name:var(--font-display)] text-[0.85rem] font-semibold last:pr-0"
    />
  ),
  td: (props) => (
    <td {...props} className="border-b py-3 pr-6 align-top leading-[1.6] last:pr-0" />
  ),
};
