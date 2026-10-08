# MACRO — Men's Health Optimization System

> A single-file protein optimization and biohacking web app for men 18–50.

🔗 **Live App:** [prodbykctw-max.github.io/macro-app](https://prodbykctw-max.github.io/macro-app/) (GitHub Pages, serves `index.html` from this repo) · [macroappbykctw.netlify.app](https://macroappbykctw.netlify.app) (Netlify; deployed separately, see [Deployment](#deployment))
👤 **Creator:** KCTW · [@prodbykctw](https://instagram.com/prodbykctw)
🎵 **Music:** [Spotify](https://open.spotify.com/artist/1tVXH4rasJKQEZFAEodmGe) · [Apple Music](https://music.apple.com/us/album/tres-single/1696935461) · [SoundCloud](https://soundcloud.com/prodbykctw)

---

## What is MACRO?

MACRO is a men's health command center that ships as **one HTML file** (`index.html`). There are
no accounts, no subscriptions and no backend. Your data stays in your browser. The only features
that call out to the network are the AI features and the Google Fonts.

### Built In:
- 172 protein foods with macros and cost (the app's own copy still says "254"; the `FOODS` array has 172)
- 82 high-protein recipes
- 9 grocery stores with cost comparison (Walmart, Kroger, Aldi, Costco, Target, Trader Joe's,
  Sprouts, Whole Foods, Publix). Prices are a Walmart baseline times a fixed multiplier for each
  store. They are not live prices.
- 16 supplements across 3 phases: Foundation Stack (8), Performance Layer (2), and Longevity &
  Optimization (6)
- Functional foods, fiber protocol, testosterone protocol and myostatin protocol
- Blood type food profiles (O, A, B, AB)
- Carb target calculator (ISSN · ACSM · NSCA · Academy of Nutrition and Dietetics)
- AI chat and an AI "custom plan" generator (Claude, see [AI features](#ai-features))
- Long-press, iPhone-style tab wheel navigation with a haptic buzz and a Web Audio tick
- Editable schedule: rename, retime, add and remove daily routine rows, and edit the weekly split
- Settings for currency (USD/EUR/GBP) and units (LBS/KG, OZ/G). These choices are saved, but
  displayed prices and amounts don't use them yet. Prices always show in `$`.

---

## Quick Start

### Option 1: Use the Live App
Visit [prodbykctw-max.github.io/macro-app](https://prodbykctw-max.github.io/macro-app/).

### Option 2: Run Locally
```bash
git clone https://github.com/prodbykctw-max/macro-app.git
cd macro-app

# Open the HTML file in any browser
open index.html
```

That's it. No npm install, no build step, no backend.

### Option 3: Host Your Own
`index.html` is the whole app. Put it on any static host, for example
[netlify.com/drop](https://app.netlify.com/drop).

---

## Architecture

**Single-file HTML application.** All the CSS, JavaScript, data and UI are in one file of about
495 KB and 6,800 lines.

| Layer | Technology |
|-------|-----------|
| Runtime | Browser (Safari/Chrome/Firefox/Edge) |
| Language | Vanilla JavaScript (no frameworks) |
| Storage | localStorage + IndexedDB (`macroDB`) |
| Fonts | Google Fonts (Bebas Neue + Oswald + Inter) |
| AI | Anthropic Messages API, model `claude-sonnet-4-20250514` |

### Why Single-File?

- **Zero infrastructure cost**: no servers, no databases
- **Distribution-friendly**: email it, text it, host it anywhere
- **Privacy-maximizing**: your data is stored on your device
- **Sale-ready**: you own the entire codebase as source

📖 **Full architecture deck:** [MACRO-Deck.md](./MACRO-Deck.md). It was written for v2.4, so some
numbers in it are out of date.

### Storage

- **localStorage keys:** `macroGame`, `macroPrefs`, `macroRoutine`, `macroWeek`,
  `macroTrainingDays`, `macroTheme`, `macroBloodType`, `macroTourSeen`, `macroTourSkipped`,
  `macroLogs`, `macroWeightLog`, `macroProgress`, `macroCarbGoal`, `macroCarbWeight`,
  `macroAiHistory`, `macroLiteMode`, `macroEmail`, `macroEmailDismissed`, `macroAffClicks`
- **IndexedDB `macroDB` (v1) stores:** `logs`, `weights`, `prefs`, `customFoods`. If IndexedDB is
  unavailable, the app falls back to localStorage.

---

## Features

### 9 Panels

| # | Panel | Purpose |
|---|-------|---------|
| 1 | 🎯 Target | Set daily protein goal (body weight calc + presets), carb calculator |
| 2 | 🛒 Prefs | Diet type, store, allergens, meat preferences |
| 3 | 🍽️ Plan | Meal plan built in the browser from the food list, with swap + sides; optional AI custom plan |
| 4 | 💰 Cost | Daily/weekly/monthly/yearly cost across the 9 stores |
| 5 | 📅 Schedule | Routine + weekly split (editable) |
| 6 | 💊 Protocols | Supplements, functional foods, fiber, T-protocol, myostatin |
| 7 | 📈 Progress | Readiness, sleep, water, mood, streaks, XP |
| 8 | 🔗 Connect | Calendar (.ics) export, share, IG, About/Science/Privacy pages |
| 9 | 📖 Recipes | 82 high-protein recipes |

The app always opens on Panel 1.

---

## AI features

- **AI chat** sends your messages to `https://api.anthropic.com/v1/messages`. Each message
  includes your protein target, diet, store, budget and meat exclusions as context.
- **Generate My Plan** sends what you feel like eating to the same endpoint.

Both requests go straight from the browser with no API key, and there is no proxy in this repo.
A request without a key gets `401 authentication_error` ("x-api-key header is required"). So on
an ordinary static host like GitHub Pages or Netlify, the AI features show an error message.
Everything else works without them.

---

## Privacy

All user data is stored locally in the browser (`localStorage` + `IndexedDB`). There are no
analytics, no telemetry and no tracking pixels.

What can leave your device:

- The AI features, which send their messages to the Anthropic API (see above).
- Fonts, which load from Google Fonts.
- Links you click: supplement "Buy" links are Amazon affiliate links.

The email capture form stores the address locally only. Its submit request is commented out in
the code.

---

## Tech Highlights

- About 240 functions in about 6,800 lines
- Modal layering registry (`_openModals` + `body.modal-open`)
- Long-press wheel navigation (280 ms hold) with haptic + Web Audio tick
- Three color systems: Stealth Operator, BioHacker Gradient, Monochrome
- Forced dark mode (`color-scheme: dark`)
- Editable routine + weekly split
- Blood type profile system
- 16 achievement badges + XP/level system (11 levels)
- Guided tour on first use

---

## Repo layout

| Path | What it is |
|------|-----------|
| `index.html` | The app (v2.6.3, same content as `archive/macro-protein-planner_v2.6.3.html`; the page `<title>` still says v2.4) |
| `VERSION.txt` | Current version note |
| `archive/` | Earlier builds, v2.4 through v2.6.3, including two marked broken |
| `MACRO-Deck.md` | Architecture / product deck (v2.4) |
| `HANDOFF.md` | Session handoff notes |
| `LICENSE` | Personal use license |

---

## Deployment

There is no build step and no deploy config in the repo (no workflow, no `netlify.toml`).

- **GitHub Pages:** serves `index.html` from this repository. On 2026-10-08 it matched `main`
  byte for byte.
- **Netlify** (`macroappbykctw.netlify.app`): updated separately, by hand. On 2026-10-08 it served
  an older build that is missing the chat-escaping change now on `main`.

---

## Known gaps

- The app's own text says 254 foods, but `FOODS` contains 172.
- The currency and unit settings are saved but not applied to displayed values. `fmtCurrency()`
  exists but is never called.
- The Gumroad link (`gumroad.com/macro-app`) is a placeholder (marked TODO in the code) and
  returns 404.
- The Amazon affiliate short links (`amzn.to/3…`) redirect to the amazon.com home page, not to
  products.
- The AI features need a proxy or key that this repo doesn't include.
- There is no service worker, so the hosted app isn't cached for offline use.

---

## Roadmap

- [ ] Plan + Protocols custom items (Phase 2 edit mode)
- [ ] Service worker for offline use / home-screen install (an inline manifest already exists)
- [ ] Custom domain
- [ ] Apple Health / Google Fit integration
- [ ] Native iOS app via Capacitor

---

## License

See [LICENSE](./LICENSE). Personal, non-commercial use is free, with attribution to KCTW
(@prodbykctw). Commercial use or white-labeling needs a separate commercial license: contact
[@prodbykctw](https://instagram.com/prodbykctw) on Instagram. MACRO is an informational tool, not
medical advice.

---

**Built with deliberate constraint. One file. Zero bloat. Full ownership.**
