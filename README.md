# ikki.dev.br

Personal portfolio and case studies. Next.js 16 (App Router), Tailwind v4, MDX, deployed on Vercel.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## Structure

```
src/
  app/[locale]/        routes: home, work, work/[slug], about
  components/          UI, including the event-trace hero
  content/work/        case studies as MDX, one file per locale
  i18n/                en.ts and pt.ts dictionaries; pt is typed against en
  lib/site.ts          links, email, domain
  lib/work.ts          project registry: period, stack, links, per-locale copy
  proxy.ts             308s a locale-less path to the default locale (pt)
```

## Adding a case study

1. Add an entry to `src/lib/work.ts`.
2. Create `src/content/work/<slug>/en.mdx` and `pt.mdx`.

Both locale files are required — `generateStaticParams` builds every locale/slug pair,
so a missing file fails the build rather than shipping a broken page.

## Translations

`src/i18n/pt.ts` is typed as `Dictionary`, the shape inferred from `en.ts`. Adding a key to
`en.ts` without adding it to `pt.ts` is a type error, so the two cannot drift.

## Notes

- Theme: light by default, dark via `prefers-color-scheme` or the toggle, stored in `localStorage`.
- MDX plugins are referenced by name in `next.config.ts` because Turbopack serialises loader options.
- Résumé PDFs live in `public/` and are linked per locale from `src/lib/site.ts`.
- Analytics: Google Analytics 4, production builds only. Add `data-event="<name>"` (and an optional
  `data-event-label`) to any element to report its clicks; see `src/components/analytics.tsx`.
