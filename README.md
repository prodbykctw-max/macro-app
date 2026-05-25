# MACRO — Men's Health Optimization System

> A single-file, offline-first protein optimization and biohacking platform for men 18–50.

🔗 **Live App:** [macroappbykctw.netlify.app](https://macroappbykctw.netlify.app)
👤 **Creator:** KCTW · [@prodbykctw](https://instagram.com/prodbykctw)
🎵 **Music:** [Spotify](https://open.spotify.com/artist/1tVXH4rasJKQEZFAEodmGe) · [Apple Music](https://music.apple.com/us/album/tres-single/1696935461) · [SoundCloud](https://soundcloud.com/prodbykctw)

---

## What is MACRO?

MACRO is a complete men's health command center that ships as **one HTML file**. No accounts. No subscriptions. No data collection. Runs 100% offline in any modern browser.

### Built In:
- 254 USDA-accurate protein foods
- 82 high-protein recipes
- 9 grocery stores with live price comparison
- 16-supplement stack across 3 phases (Foundation → Optimize → Elite)
- Myostatin reduction protocol with sleep science
- Testosterone optimization protocol
- Blood type food profiling
- Carb target calculator (ISSN · ACSM · NSCA · AND)
- Claude AI assistant
- Long-press iPhone-style tab wheel navigation
- Full edit mode (rename meals, retime workouts, customize routine)
- Currency support (USD/EUR/GBP) + unit toggle (LBS/KG, OZ/G)

---

## Quick Start

### Option 1: Use the Live App
Just visit [macroappbykctw.netlify.app](https://macroappbykctw.netlify.app)

### Option 2: Run Locally
```bash
# Clone the repo
git clone https://github.com/[your-username]/macro-app.git
cd macro-app

# Open the HTML file in any browser
open macro-protein-planner.html
```

That's it. No npm install. No build step. No backend. Just open the file.

### Option 3: Host Your Own
Drop `macro-protein-planner.html` onto [netlify.com/drop](https://app.netlify.com/drop) — you get a live URL in 30 seconds.

---

## Architecture

**Single-file HTML application.** All CSS, JavaScript, data, and UI in one ~465KB file.

| Layer | Technology |
|-------|-----------|
| Runtime | Browser (Safari/Chrome/Firefox/Edge) |
| Language | Vanilla JavaScript (ES6+, no frameworks) |
| Storage | localStorage + IndexedDB |
| Fonts | Google Fonts (Bebas Neue + Oswald + Inter) |
| AI | Anthropic Claude API (via proxy) |

### Why Single-File?

- **Zero infrastructure cost** — no servers, no databases
- **Distribution-friendly** — email it, text it, host anywhere
- **Privacy-maximizing** — zero data leaves the device by default
- **Sale-ready** — own the entire codebase as source

📖 **Full architecture deck:** [DESIGN_DOC.md](./DESIGN_DOC.md)

---

## Features

### 9 Panels

| # | Panel | Purpose |
|---|-------|---------|
| 1 | 🎯 Target | Set daily protein goal (body weight calc + presets) |
| 2 | 🛒 Prefs | Diet type, store, allergens, meat preferences |
| 3 | 🍽️ Plan | AI-generated meal plans with swap + sides |
| 4 | 💰 Cost | Daily/weekly/monthly/yearly breakdown across 9 stores |
| 5 | 📅 Schedule | Routine + weekly split (fully editable) |
| 6 | 💊 Protocols | Supplements, foods, fiber, T-protocol, myostatin |
| 7 | 📈 Progress | Readiness, sleep, water, mood, streaks, XP |
| 8 | 🔗 Connect | Calendar export, share, IG, pages |
| 9 | 📖 Recipes | 82 high-protein recipes |

---

## Privacy

**Zero data collection.** All user data stored locally in browser (`localStorage` + `IndexedDB`). No analytics, no telemetry, no tracking pixels. Optional AI chat sends messages to Anthropic Claude API; nothing else leaves your device.

---

## Tech Highlights

- 220+ functions, 6,700+ lines
- Modal layering registry (no z-index obstruction bugs)
- Long-press wheel navigation with haptic + Web Audio tick
- Three color systems (Stealth Operator, BioHacker, Monochrome)
- Forced dark mode (no light auto-trigger)
- Cubic-bezier easing throughout (Apple iOS curve)
- Full edit mode for routine + schedule
- Blood type profile system
- 16 achievement badges + XP/level system

---

## Roadmap

- [ ] Plan + Protocols custom items (Phase 2 edit mode)
- [ ] PWA manifest for home-screen install
- [ ] Custom domain
- [ ] Apple Health / Google Fit integration
- [ ] Native iOS app via Capacitor

---

## License

Personal use: Free forever.
Commercial use / white-label: Contact [@prodbykctw](https://instagram.com/prodbykctw) or purchase source code on Gumroad.

---

**Built with deliberate constraint. One file. Zero bloat. Full ownership.**
