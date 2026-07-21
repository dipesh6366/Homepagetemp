# Homepage Design — Extracted

This is just the homepage design from your uploaded project, pulled out and cleaned up
so it can drop into a Next.js app. Everything else has been removed:

**Removed:** Firebase, the local `store.ts` backend, admin panel, editor login/auth,
about/help/menu pages, article detail page, contributor profiles, leaderboard.

**Kept, pixel-for-pixel:** top utility bar, masthead, breaking news ticker, category
tabs, hero + featured + compact + headline article layout, weather sidebar, opinion
poll card, footer. All Tailwind classes are untouched from the original.

Article cards, author tags, the menu icon, and the editor-login icon are still there
visually, but their click handlers are now empty stubs (see `handleViewArticle`,
`handleViewAuthor`, `goHome`, `openMenu`, `openAdmin` in `components/Homepage.tsx`).
Wire those up to your own routes/pages, e.g.:

```tsx
const handleViewArticle = (art: NewsArticle) => {
  router.push(`/article/${art.id}`);
};
```

## Files

```
app/
  page.tsx        → renders <Homepage />
  globals.css      → fonts + theme vars + marquee/border utilities the design needs
components/
  Homepage.tsx     → the homepage design itself
  BreakingNewsTicker.tsx
  OpinionPollCard.tsx  → now self-contained (local state, no backend)
lib/
  dateUtils.ts     → Marathi date/time formatting for the header clock
types.ts
data.ts            → static mock articles/weather/poll (swap for your real data source)
```

## How to install into your Next.js project

1. Copy `components/`, `lib/`, `types.ts`, and `data.ts` into your project root
   (or `src/` if that's your layout).
2. Merge `app/globals.css` into your existing global stylesheet — mainly the
   `@theme` font variables and the `.news-border-double` / `.animate-marquee` rules.
3. Use `Homepage` wherever you want it, e.g. `app/page.tsx`:
   ```tsx
   import Homepage from "@/components/Homepage";
   export default function Page() {
     return <Homepage />;
   }
   ```
4. Install the one extra dependency it needs:
   ```
   npm install lucide-react
   ```

## Requirements / assumptions

- **Tailwind CSS v4** with `@tailwindcss/typography` — same as the original project.
  If your project is on Tailwind v3, the `@import "tailwindcss"` / `@theme` syntax
  in `globals.css` won't work as-is; ask me and I'll port it to a `tailwind.config.js`
  setup instead.
- **React 19 / Next.js App Router** — `Homepage.tsx` is a client component
  (`"use client"`) since it uses `useState`/`useEffect` for the live clock and
  category filtering.
- Replace `data.ts` with real data whenever you're ready — every component just
  expects the same `NewsArticle` / `WeatherCity` / `OpinionPoll` shapes from `types.ts`.
