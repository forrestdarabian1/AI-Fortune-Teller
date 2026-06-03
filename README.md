# AI Fortune Teller

A single-page React app that reveals AI-generated mystical fortunes. Pick a life category, optionally ask a question, and receive a fortune with insight, timeframe, and lucky details—powered by the [APIVerve Fortune Teller API](https://docs.apiverve.com/ref/fortuneteller).

> **For AI assistants:** This README is the onboarding entry point. Read it first, then [MEMORY.md](./MEMORY.md) for current state and conventions, and [PLAN.md](./PLAN.md) for full architecture and API specs.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [npm scripts](#npm-scripts)
- [Using the app](#using-the-app)
- [Project structure](#project-structure)
- [Architecture](#architecture)
- [API summary](#api-summary)
- [Development conventions](#development-conventions)
- [Building for production](#building-for-production)
- [Troubleshooting](#troubleshooting)
- [Security](#security)
- [Documentation index](#documentation-index)
- [Roadmap](#roadmap)

---

## Features

- Six fortune categories: general, love, career, health, wealth, travel
- Optional personalized question (up to 500 characters)
- AI-generated fortune, insight, and timeframe
- Lucky numbers, color, element, and day
- Dark mystical UI with loading and error states
- Accessible form controls and live regions for screen readers

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js 18+ (20+ recommended) |
| Build tool | [Vite](https://vite.dev/) 8 |
| UI | [React](https://react.dev/) 19 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 + `tailwindcss-animate`; theme in `src/index.css` |
| External API | APIVerve Fortune Teller REST |
| Linting | ESLint 10 |

**v1 design:** Browser-only SPA. No backend server. API calls go directly from the browser to APIVerve (CORS supported).

---

## Prerequisites

1. **Node.js** — v18 or newer ([nodejs.org](https://nodejs.org/))
2. **npm** — included with Node
3. **APIVerve API key** — free tier available at [dashboard.apiverve.com](https://dashboard.apiverve.com/signup)

You do **not** need Apache, MySQL, or Laragon services for this app—only Node/npm in a terminal.

---

## Quick start

```bash
# 1. Go to the project directory
cd "AI Fortune Teller"

# 2. Install dependencies (first time only)
npm install

# 3. Configure your API key
cp .env.example .env
# Edit .env and set: VITE_API_KEY=apv_your_key_here

# 4. Start the development server
npm run dev
```

Open the URL Vite prints (usually **http://localhost:5173**). Choose a category, optionally enter a question, and click **Reveal my fortune**.

**Important:** Restart `npm run dev` after changing `.env`—Vite reads environment variables at startup.

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_KEY` | Yes | Your APIVerve API key (starts with `apv_`) |

**Setup:**

1. Copy `.env.example` to `.env`
2. Paste your key from the [APIVerve dashboard](https://dashboard.apiverve.com/)
3. Never commit `.env` (it is listed in `.gitignore`)

Example `.env`:

```env
VITE_API_KEY=apv_your_key_here
```

Only variables prefixed with `VITE_` are exposed to the client bundle. The key is read in `src/api/fortuneTeller.js` via `import.meta.env.VITE_API_KEY`.

---

## npm scripts

| Command | What it does |
|---------|----------------|
| `npm run dev` | Starts Vite dev server with hot module replacement (HMR) |
| `npm run build` | Compiles optimized static assets into `dist/` |
| `npm run preview` | Serves the production build locally (test before deploy) |
| `npm run lint` | Runs ESLint on the project |
| `npm run test` | Runs Vitest unit tests once (`vitest run`) |

**Typical workflows:**

| Goal | Commands |
|------|----------|
| Local development | `npm run dev` |
| Verify production build | `npm run build && npm run preview` |
| Pre-commit check | `npm run lint && npm run test` (or just `git commit` — Husky runs these automatically) |

### Git pre-commit hook (Husky)

After `npm install`, Husky is enabled via the `prepare` script. Each `git commit` runs, in order:

1. **`npm run check-secrets`** — refuses staged `.env` files, `apv_` keys with 16+ real characters (not placeholders like `apv_your_key_here`), and PEM private keys
2. **`npm run lint`**
3. **`npm run test`**

Hook script: [`.husky/pre-commit`](./.husky/pre-commit). Secret scanner: [`scripts/check-staged-secrets.mjs`](./scripts/check-staged-secrets.mjs).

To bypass in an emergency only: `git commit --no-verify` (not recommended).

New clones: run `npm install` once so `prepare` registers hooks.

---

## Using the app

1. **Choose a focus** — Select one of six category pills (default: General).
2. **Ask a question (optional)** — Type up to 500 characters; placeholders change per category.
3. **Reveal my fortune** — Submits the form; expect **~3–5 seconds** while the API responds.
4. **Read your fortune** — Main text, insight, timeframe, and lucky details appear with a short animation.
5. **Ask again** — Change category or question and submit again; the form stays enabled after each result.

Each API call costs **5 APIVerve credits**.

---

## Project structure

```
AI Fortune Teller/
├── .cursor/rules/          # Cursor AI rules (always-on conventions)
├── .env.example            # Template for environment variables
├── PLAN.md                 # Architecture & API specification
├── MEMORY.md               # Living AI context (state, changelog, rules)
├── README.md               # This file — human & LLM onboarding
├── index.html              # HTML entry point
├── package.json
├── vite.config.js
├── public/                 # Static assets (favicon, etc.)
└── src/
    ├── main.jsx            # React root mount
    ├── App.jsx             # Top-level composition
    ├── index.css           # Tailwind import, @theme tokens, base styles, .stars
    ├── lib/
    │   └── revealClasses.js  # Shared fortune-reveal animation classes
    ├── api/
    │   └── fortuneTeller.js    # APIVerve client (only place that fetches)
    ├── hooks/
    │   └── useFortune.js       # Loading, error, fortune state
    └── components/
        ├── Layout/         # AppShell, Header
        ├── Form/           # FortuneForm, CategorySelect, QuestionInput, RevealButton
        ├── Fortune/        # FortuneReveal, FortuneCard, InsightCard, LuckyDetails
        └── Feedback/       # LoadingState, ErrorMessage
```

**Entry flow:** `index.html` → `src/main.jsx` → `src/App.jsx` → components + `useFortune` → `fetchFortune()` in `src/api/fortuneTeller.js`.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (React SPA)                  │
│  ┌──────────────┐    ┌─────────────┐    ┌────────────┐ │
│  │  Components  │───▶│ useFortune  │───▶│ fortune    │ │
│  │  (UI only)   │    │   (hook)    │    │ Teller.js  │ │
│  └──────────────┘    └─────────────┘    └─────┬──────┘ │
└───────────────────────────────────────────────│─────────┘
                                                │ GET + X-API-Key
                                                ▼
                                    ┌───────────────────────┐
                                    │  APIVerve             │
                                    │  /v1/fortuneteller    │
                                    └───────────────────────┘
```

| Layer | File(s) | Responsibility |
|-------|---------|----------------|
| UI | `src/components/**` | Render form, loading, errors, fortune results |
| State | `src/hooks/useFortune.js` | `loading`, `error`, `fortune`; calls API on submit |
| API | `src/api/fortuneTeller.js` | HTTP request, validation, error normalization |
| External | APIVerve | AI fortune generation |

**Rules:**

- Components never call `fetch` directly.
- All categories come from `VALID_CATEGORIES` in `fortuneTeller.js`.
- No backend in v1 unless explicitly added later.

See [PLAN.md](./PLAN.md) for diagrams, component tables, and sequence flows.

---

## API summary

| Item | Value |
|------|--------|
| Endpoint | `GET https://api.apiverve.com/v1/fortuneteller` |
| Auth | Header `X-API-Key: <VITE_API_KEY>` |
| Query: `category` | Optional — `general`, `love`, `career`, `health`, `wealth`, `travel` |
| Query: `question` | Optional — max 500 characters |
| Response | `{ status, error, data }` — app uses `data` on success |

**Example success payload (`data`):**

```json
{
  "fortune": "…",
  "insight": "…",
  "timeframe": "in the coming weeks",
  "category": "love",
  "luckyNumbers": [87, 10, 16],
  "luckyElement": "Wood",
  "luckyColor": "Purple",
  "luckyDay": "Tuesday",
  "timestamp": "2025-12-16T22:23:31.796Z"
}
```

Full request/response documentation: [APIVerve Fortune Teller API](https://docs.apiverve.com/ref/fortuneteller)

---

## Development conventions

| Topic | Convention |
|-------|------------|
| Language | JavaScript + JSX (no TypeScript in v1) |
| Components | Default export; props + callbacks, no direct API calls |
| Styling | Tailwind utilities in components; custom palette via `@theme` in `index.css` (`bg-gold`, `font-display`, etc.) |
| New dependencies | Avoid unless necessary; ask before adding |
| Accessibility | `aria-live` on loading/results; `role="alert"` on errors; labeled inputs |
| Commits | Do not commit `.env`; rotate API keys if the repo becomes public |

When using **Cursor** or other AI tools, also read [MEMORY.md](./MEMORY.md) and `.cursor/rules/ai-fortune-teller.mdc`.

---

## Building for production

```bash
npm run build
```

Output is written to **`dist/`**—static HTML, JS, and CSS ready to deploy.

**Preview locally before deploying:**

```bash
npm run preview
```

Deploy `dist/` to any static host (Netlify, Vercel, GitHub Pages, nginx, etc.). Ensure your host serves `index.html` for SPA routes if you add routing later.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| **Missing API key** | Create `.env` with `VITE_API_KEY=apv_…` and restart `npm run dev` |
| **API / 401 / credit errors** | Verify key in [APIVerve dashboard](https://dashboard.apiverve.com/); check credit balance (5 per call) |
| **Network error** | Check internet connection; API must be reachable from your browser |
| **Port already in use** | Vite will suggest another port in the terminal—use that URL |
| **Changes to `.env` not applied** | Stop and restart the dev server |
| **Blank page after build** | Run `npm run preview` to test; check browser console for errors |
| **Slow response** | Normal—API average latency is ~2.5–5 seconds |

---

## Security

- **`.env` is gitignored** — never commit API keys.
- **Client-side key exposure** — `VITE_API_KEY` is embedded in the production JavaScript bundle. Fine for personal/local projects; for public repos, use a backend proxy and rotate keys.
- **Rate limits / credits** — monitor usage in the APIVerve dashboard.

---

## Documentation index

| File | Audience | Purpose |
|------|----------|---------|
| **README.md** (this file) | Humans & LLMs | Setup, run, structure, troubleshooting |
| **[PLAN.md](./PLAN.md)** | Developers & LLMs | Full architecture, API contract, component spec |
| **[MEMORY.md](./MEMORY.md)** | AI assistants | Current state, conventions, changelog—update after changes |
| **`.cursor/rules/ai-fortune-teller.mdc`** | Cursor | Always-on project rules pointing to MEMORY.md |
| **`.env.example`** | Everyone | Environment variable template |

---

## Roadmap

Not yet implemented (see [PLAN.md](./PLAN.md) §10 and [MEMORY.md](./MEMORY.md)):

- GraphQL access via `POST /v1/graphql`
- Fortune history in `localStorage`
- Shareable fortune card image
- Optional Vite proxy / backend to hide API key in production

---

## License

Private project (`"private": true` in `package.json`). Add a license file if you open-source this repo.
