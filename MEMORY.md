# AI Fortune Teller — Project Memory

> **For AI agents:** Read this file at the start of substantial tasks. Update the [Changelog](#changelog) and [Current state](#current-state) sections when you finish meaningful work. Do not duplicate [PLAN.md](./PLAN.md)—link to it for architecture/API specs.

**Last updated:** 2026-06-03

---

## What this project is

A **Vite 8 + React 19** single-page app that calls the **APIVerve Fortune Teller API** from the browser. Users choose a category, optionally ask a question, and receive an AI fortune with insight and lucky metadata.

- **Spec / architecture:** [PLAN.md](./PLAN.md)
- **Human setup / onboarding:** [README.md](./README.md) (comprehensive quick start, structure, troubleshooting)
- **Cursor rules:** [.cursor/rules/ai-fortune-teller.mdc](./.cursor/rules/ai-fortune-teller.mdc)

---

## Current state

### Implemented (v1 complete)

| Area | Status |
|------|--------|
| API client | `src/api/fortuneTeller.js` — `fetchFortune`, `validateQuestion`, `VALID_CATEGORIES` |
| Hook | `src/hooks/useFortune.js` — `loading`, `error`, `fortune`, `revealFortune`, `clearError` |
| UI | Full component tree under `src/components/` (Layout, Form, Fortune, Feedback) |
| Styling | Tailwind CSS v4 + `tailwindcss-animate`; `@theme` in `src/index.css`; utilities in components |
| Env | `.env` gitignored; `.env.example` documents `VITE_API_KEY` |
| Build | `npm run build`, `npm run lint`, and `npm run test` pass |
| Tests | Vitest + Testing Library — `fortuneTeller.test.js`, `ErrorMessage.test.jsx` |

### Not implemented (future)

- GraphQL (`POST /v1/graphql`)
- Fortune history (`localStorage`)
- Shareable fortune card
- Backend proxy to hide API key in production

### Key files

```
src/App.jsx              # Composes shell, form, loading, error, results
src/api/fortuneTeller.js # Only place that calls APIVerve
src/hooks/useFortune.js  # Fetch lifecycle; no API logic here
src/components/          # Presentational + form; no direct fetch
```

---

## Core rules (do not break)

### Architecture

1. **No backend in v1.** All API calls go through `src/api/fortuneTeller.js` only.
2. **Direct browser → APIVerve** (CORS enabled). Do not add a proxy unless explicitly requested.
3. **Single source for categories:** Import `VALID_CATEGORIES` from `fortuneTeller.js`; do not duplicate the list elsewhere.
4. **Env:** API key is `import.meta.env.VITE_API_KEY` only in the API client. Never commit `.env`.

### Code style

1. **Minimal scope** — smallest correct change; match existing patterns (plain JSX, no TypeScript, Tailwind utilities).
2. **No new dependencies** unless the user asks or the feature clearly requires it.
3. **Components stay dumb** — API and validation live in `api/` and `hooks/`; components receive props and callbacks.
4. **CSS** — Tailwind v4 via `@tailwindcss/vite`. Theme tokens in `index.css` `@theme` (`--color-gold`, etc.). Component styles use utilities; shared reveal animations in `src/lib/revealClasses.js`. Keep `.stars` in `@layer components` only.
5. **Accessibility** — Keep `aria-live` on loading/results, `role="alert"` on errors, labeled form fields.

### API (APIVerve)

- **Endpoint:** `GET https://api.apiverve.com/v1/fortuneteller`
- **Header:** `X-API-Key: <VITE_API_KEY>`
- **Params:** `category` (optional, default `general`), `question` (optional, max 500 chars)
- **Categories:** `general`, `love`, `career`, `health`, `wealth`, `travel`
- **Response:** `{ status, error, data }` — return `data` on success; throw `Error` with user-facing message on failure
- **Docs:** https://docs.apiverve.com/ref/fortuneteller

### Git / secrets

- Never commit `.env` or API keys.
- Do not create commits unless the user asks.

### Docs

- **PLAN.md** = product/architecture spec (update only if scope changes).
- **MEMORY.md** = living AI context (update after fixes/features).
- **README.md** = comprehensive human & LLM onboarding (setup, structure, troubleshooting)—keep in sync when run/deploy steps change.

---

## Conventions cheat sheet

| Topic | Convention |
|-------|------------|
| File extension | `.jsx` for React, `.js` for logic |
| Exports | Default export for components; named exports for hooks/utils |
| Form submit | `FortuneForm` calls `onSubmit(category, question)` |
| Category UI | Pill radios in `CategorySelect` |
| Error display | `ErrorMessage` with optional `onDismiss` |
| Loading | Show `LoadingState` while `loading`; hide previous fortune until new result |
| Lucky color | `LuckyDetails` maps color names via `COLOR_MAP`; text fallback if unknown |
| Animations | `tailwindcss-animate` + `src/lib/revealClasses.js`; use `motion-reduce:animate-none` on motion |

---

## How to run

```bash
npm install
# Ensure .env has VITE_API_KEY=apv_...
npm run dev      # http://localhost:5173 (typical)
npm run build    # output → dist/
npm run preview  # preview production build
npm run test     # Vitest unit tests (jsdom)
```

Restart dev server after changing `.env`.

---

## Changelog

> AI: Append new entries at the top. Include date and one-line summary.

### 2026-06-03 — Vitest unit tests

- Added Vitest, Testing Library, jsdom; `npm run test` runs `vitest run`.
- Tests: `validateQuestion` / `VALID_CATEGORIES` in `fortuneTeller.test.js`; `ErrorMessage` render in `ErrorMessage.test.jsx`.

### 2026-05-19 — Tailwind CSS v4 migration

- Added `tailwindcss`, `@tailwindcss/vite`, `tailwindcss-animate`.
- Migrated all components to Tailwind utilities; deleted `App.css`.
- Theme in `index.css` `@theme`; staggered reveal via `src/lib/revealClasses.js`.

### 2026-05-19 — Comprehensive README

- Expanded README.md: quick start, env, scripts, structure, architecture, API summary, troubleshooting, doc index for humans and LLMs.

### 2026-05-19 — Initial v1 + project memory

- Scaffolded full app per [PLAN.md](./PLAN.md): API client, `useFortune`, component tree, mystical theme.
- Chose **direct browser calls** to APIVerve (no proxy).
- Added `.env` to `.gitignore`, `.env.example`, updated README.
- **Note during scaffold:** Early drafts of `AppShell.jsx` / `LoadingState.jsx` briefly used invalid JSX tag names (editor typo); fixed to standard `<div>` elements before ship. Always use valid HTML elements in JSX.

---

## Known issues / watch list

| Issue | Notes |
|-------|--------|
| API key in bundle | Acceptable for local/personal use; use proxy + rotate key if repo is public |
| ~3–5s API latency | Expected; loading UI accounts for this |
| Category labels duplicated | `CategorySelect` and `FortuneCard` both map labels—consolidate only if a third consumer appears |

---

## When updating this file

After you:

- Fix a bug → add to **Changelog** and **Known issues** (remove if resolved)
- Add a feature → update **Current state** and **Changelog**
- Change architecture → update **Core rules** and point user to update **PLAN.md** if spec-level

Keep entries short. Prefer tables and bullet lists over prose.
