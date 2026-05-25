# MACRO — Men's Health Optimization System

**Version 2.4 · Production Build · April 2026**

A single-file, offline-first, AI-augmented protein optimization and biohacking platform engineered for men 18–50 pursuing performance, body composition, and longevity goals.

🔗 **Live:** [macroappbykctw.netlify.app](https://macroappbykctw.netlify.app)
👤 **Creator:** KCTW · [@prodbykctw](https://instagram.com/prodbykctw)
📁 **Stack:** Single-file HTML/CSS/JS · ~465KB · 6,700+ lines · 220+ functions · 9 panels

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Vision & Positioning](#vision--positioning)
3. [Technical Architecture](#technical-architecture)
4. [Feature Inventory](#feature-inventory)
5. [Data Layer](#data-layer)
6. [UI/UX Design System](#uiux-design-system)
7. [State Management](#state-management)
8. [Modal Layering System](#modal-layering-system)
9. [User Journey](#user-journey)
10. [Build History & Decisions](#build-history--decisions)
11. [Monetization Strategy](#monetization-strategy)
12. [Performance & Optimization](#performance--optimization)
13. [Privacy & Compliance](#privacy--compliance)
14. [Edit Mode & Personalization](#edit-mode--personalization)
15. [Distribution & Deployment](#distribution--deployment)
16. [Technical Debt & Roadmap](#technical-debt--roadmap)
17. [Senior Dev Notes](#senior-dev-notes)

---

## Executive Summary

MACRO is a complete men's health optimization toolkit built as a **single-file HTML application** — no backend, no database server, no authentication required. The entire app — 254 USDA-accurate foods, 82 high-protein recipes, 16-supplement protocol stack, AI assistant integration, 9-tab navigation system, and full personalization layer — ships as one ~465KB HTML file that runs offline in any modern browser.

### Why Single-File HTML?

This is the architectural thesis of MACRO. The decision was made deliberately, not as a constraint, but as a strategic choice:

- **Zero infrastructure cost.** No servers, no databases, no auth providers, no monthly burn rate.
- **Sale-ready as source code.** Every customer can buy the entire codebase on Gumroad for $49 and own a complete white-label fitness app.
- **Distribution-friendly.** Email the file, text it, host on Netlify drop, drop on GitHub Pages, embed in iframes — works everywhere.
- **Privacy-maximizing.** Zero data leaves the user's device unless they explicitly opt in to AI chat or affiliate links.
- **AI-resilient.** A monolithic file is easier for LLMs to understand and modify than a multi-repo codebase.
- **No deployment pipeline.** Every change ships by uploading one file.

### Target User

Men 18–50 who are:
- Already invested in fitness and nutrition optimization
- Frustrated with bloated subscription apps (MyFitnessPal, MacroFactor, etc.)
- Interested in biohacking, supplementation, and testosterone optimization
- Comfortable with deliberate, science-backed tools over gamified social platforms

### Core Differentiators

1. **Protein-first, not calorie-first.** Most apps treat protein as a number to track. MACRO treats it as the primary design constraint.
2. **Cost-aware.** 9 grocery stores with real price multipliers built in.
3. **Sleep-aware.** Myostatin reduction protocol with explicit sleep science.
4. **Blood-type-aware.** Optional personalization based on blood type traditions.
5. **Truly free.** No paywalls, no subscriptions, no premium tier (yet).

---

## Vision & Positioning

### What MACRO Is

A daily-use protein optimization and male health command center. It calculates protein targets, generates meal plans, tracks costs across 9 stores, recommends supplements, programs your workout schedule, and integrates a Claude AI assistant for personalized questions.

### What MACRO Is Not

- Not a calorie counter (though it shows calories)
- Not a social fitness app
- Not a workout video platform
- Not a coaching service

### Brand Positioning

**Biohacker lab meets premium fitness app.** The aesthetic references:
- **Levels Health** — clinical precision, data-forward
- **WHOOP** — high-contrast dark interface
- **Eight Sleep** — minimal, focused, command-center feel
- **Nike Training Club** — bold typography, athletic energy

### Tagline Options Considered

- "Men's Health Optimization"
- "Built Different"
- "Engineered Protein"
- "Your Stack. Your Numbers. Your Way."

---

## Technical Architecture

### File Structure

```
macro-protein-planner.html  (single file, ~465KB, 6,700+ lines)
├── <head>
│   ├── Meta tags (viewport, PWA, theme-color, color-scheme:dark)
│   ├── Google Fonts CDN (Bebas Neue + Oswald + Inter)
│   └── <style> — 1,000+ lines of CSS
├── <body>
│   ├── App container (.app)
│   │   ├── Header (logo, badge, settings gear)
│   │   ├── 9 Panels (each conditionally rendered)
│   │   └── Bottom nav with long-press tab wheel
│   ├── Modals (settings, swap, sides, grocery, email, music, pages)
│   ├── FABs (CHAT, KCTW music)
│   └── <script> — 220+ functions, ~5,000 lines
```

### Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Browser (Safari/Chrome/Firefox/Edge) |
| Language | Vanilla JavaScript (ES6+, no frameworks) |
| Styling | Inline CSS + `<style>` block |
| Storage | localStorage + IndexedDB (4 stores) |
| Fonts | Google Fonts CDN |
| Icons | Native emoji |
| AI | Anthropic Claude API (claude-sonnet-4-20250514) via proxy |
| Animations | CSS transitions + cubic-bezier easing |
| Audio | Web Audio API (oscillator for tick sounds) |
| Haptics | navigator.vibrate API |
| Deployment | Netlify (static hosting) |

### Why Vanilla JavaScript?

- **No build step.** Open the file, it runs.
- **No dependency rot.** No `npm audit` warnings six months from now.
- **No bundler config.** Webpack/Vite/Rollup all add complexity.
- **Inspectable.** Every customer can read and modify the code.
- **AI-friendly.** Easier for Claude to understand and modify than a TypeScript + React + Tailwind + Next.js stack.

### Three-Layer State Model

```
┌─────────────────────────────────────────┐
│ Layer 1: In-memory state (runtime only) │
│ - state.proteinTarget                   │
│ - state.mealPlan                        │
│ - tourState, tabWheel, etc.             │
└─────────────────────────────────────────┘
              ↕ persist on change
┌─────────────────────────────────────────┐
│ Layer 2: localStorage (small + sync)    │
│ - macroGame (XP, badges, userName)      │
│ - macroPrefs (units, currency)          │
│ - macroRoutine, macroWeek (edits)       │
│ - macroTheme, macroBloodType            │
│ - macroTrainingDays, macroTourSeen      │
└─────────────────────────────────────────┘
              ↕ for larger objects
┌─────────────────────────────────────────┐
│ Layer 3: IndexedDB (large + async)      │
│ - logs (daily intake history)           │
│ - weights (weight log entries)          │
│ - prefs (food/cut preferences)          │
│ - customFoods (user-added items)        │
└─────────────────────────────────────────┘
```

---

## Feature Inventory

### The 9 Panels

#### Panel 1 — 🎯 Target
**Purpose:** Set the protein target. This number drives everything downstream.

- **Body weight calculator** — age + lbs/kg input + multiplier slider (0.8–1.0 g/lb)
  - Cites ISSN 2017, ACSM 2016, NSCA CSCS 2022, Academy of Nutrition and Dietetics
  - Auto-detects tier: Weight Loss / Maintenance / Athlete / Bulk / Heavy Bulk / High BW / Super Heavy
- **Carb target calculator** — Goals: 💪 Build · ⚡ Recomp · 🔥 Cut
  - Build: 4–6 g/kg training, 2–4 g/kg rest
  - Recomp: 3–5 / 1.5–3
  - Cut: 2–4 / 1–2
  - Floor: 130 g/day (AND brain glucose minimum)
- **Quick Presets** — 100g, 150g, 175g, 200g, 225g, 250g (compact)
- **Slide to Adjust** — fine-tune slider, 50–600g (lite mode caps at 600g)
- **Weight Log + Adaptive Engine** — MacroFactor-style 7-day EMA
- **✦ Protein 9 System toggle** — round to digit-sum 9 (Tesla 369)
- **💰 Budget Mode** — caps protein selection by daily cost

#### Panel 2 — 🛒 Prefs
**Purpose:** Define how and where you eat.

- **Diet type:** Omnivore · Pescatarian · Vegetarian · Vegan · Carnivore
- **Store selector:** 9 stores with price multipliers
  - Walmart (1.00 baseline) · Kroger (1.08) · Aldi (0.88) · Costco (0.82)
  - Target (1.12) · Trader Joe's (1.18) · Sprouts (1.28) · Whole Foods (1.52) · Publix (1.15)
- **Meat cuts toggle** — chicken/beef/pork/turkey/lamb cut preferences (all default OFF)
- **Allergens** — dairy, gluten, soy, shellfish, etc.
- **Excluded meats** — opt out of specific protein sources

#### Panel 3 — 🍽️ Plan
**Purpose:** Generate optimized daily meal plans.

- **AI meal generator** — 6 meal slots (Breakfast, Mid-Morning, Lunch, Afternoon, Dinner, Evening)
- **Swap any meal** — ⇄ button opens picker with all valid alternatives
- **Add sides** — 34 sides across 5 categories (Grains, Vegetables, Beans, Fats, Fruit)
- **Per-meal macros** — protein, carbs, fat, calories, cost
- **Grocery list export** — itemized by store with total cost

#### Panel 4 — 💰 Cost
**Purpose:** See exactly what your nutrition costs.

- **Daily / Weekly / Monthly / Yearly** breakdowns
- **9-store comparison grid** — see savings vs current store
- **Functional foods cost toggle** — add bioavailability stack to budget

#### Panel 5 — 📅 Schedule
**Purpose:** Daily routine + weekly training split.

- **Daily Routine** — 9 default rows (cardio, meals, supplements, gym, sleep) — **fully editable**
- **Weekly Training Split** — 7 days with activity, time, type (train/cardio/rest) — **fully editable**
- **Training days toggle** — 1–7 days, persists across sessions
- **Stretch & Mobility Protocol** — 3 levels (Beginner / Intermediate / Yogi)
- **Hydration Rules** — 6-point clinical guidelines

#### Panel 6 — 💊 Protocols
**Purpose:** Science-backed optimization stacks.

5 sub-tabs:
- **Supps** — 16 supplements across 3 phases (Foundation / Optimize / Elite)
- **Foods** — 16 functional foods (papaya, pomegranate, beets, etc.)
- **Fiber** — 8 fiber sources with daily protocol
- **T-Protocol** — testosterone optimization stack
- **Myostatin** — myostatin reduction foods + compounds + **sleep science** (Dattilo 2011, Saremi 2010, Wankhede 2015, Abbasi 2012)

#### Panel 7 — 📈 Progress
**Purpose:** Track readiness, mood, streaks, achievements.

- **Daily logging** — readiness, sleep, water, mood
- **Breathwork timer** — Box / 4-7-8 / Wim Hof
- **Weekly wins checklist**
- **Streak tracker**
- **XP system** — 0–10,000 XP, 10 levels (Rookie → MACRO God)
- **16 achievement badges**

#### Panel 8 — 🔗 Connect
**Purpose:** Integrations, exports, social, monetization.

- **Calendar export** — .ics for Apple/Google Calendar
- **Grocery share** — Web Share API
- **JSON backup** — full data export
- **Email capture modal** — for newsletter/PDF
- **Gumroad source code listing** — $49
- **White-label inquiry** — mailto link
- **🌐 Follow & Pages** — IG link + About / Science / Privacy modal pages

#### Panel 9 — 📖 Recipes
**Purpose:** Recipe database for inspiration.

- **82 recipes** filtered by protein source, cook time, diet type
- Per-recipe macros + cost per serving

### Floating Action Buttons (FABs)

- **CHAT (right)** — opens Claude AI drawer for personalized questions
- **KCTW (left)** — opens hidden full-screen music page with 7 DSP links

Both FABs auto-hide when any modal is open (via `body.modal-open` CSS class).

### Modals

| Modal | Z-index | Trigger |
|-------|---------|---------|
| Confetti particles | 9999 | XP gain, milestones |
| Onboarding overlay | 1000 | First visit (hard gate, requires name) |
| Tour tooltip | 900 | First time visiting each tab |
| Toast notifications | 800 | Save confirmations, feedback |
| Tour backdrop | 790 | Behind tour tooltip |
| Music page | 750 | KCTW FAB tap |
| About / Science / Privacy | 700 | Connect panel buttons |
| Email capture | 700 | Email opt-in |
| Settings drawer | 600 | Header gear |
| Grocery list | 600 | Plan panel button |
| Swap food picker | 500 | ⇄ on meal card |
| Sides picker | 500 | + on meal card |
| FABs | 300 | Always visible (except when modal-open) |
| Header / Nav | 50 | Base UI |

### Onboarding Flow

3-step hard gate that fires on first visit:

1. **Name input** — required, blocks proceed if empty (shake animation)
2. **Goal selector** — Build / Cut / Performance / Testosterone
3. **Welcome splash** — name in 68px Bebas Neue, double confetti burst, personalized toast (+50 XP)

State persists in `gameState.userName` and `gameState.userGoal`.

### Tab Tour System

When a user visits a tab for the first time, a tooltip appears at the bottom pointing to the active nav button.

- **9 hard-coded tour steps** — one per tab
- **Per-tab tooltip** — icon, name, description, action hint, progress dots
- **Skip Tour button** — marks all 9 tabs as seen
- **Next →** — auto-navigates to next unseen tab
- **Done** — returns to original tab where tour started
- **3 hard gates** prevent firing during onboarding:
  1. Onboard overlay must not be `display:flex`
  2. `gameState.userName` must exist
  3. Tab not already in `tourState.seenTabs`
- **Restart from Settings** → 🧭 Restart App Tour

---

## Data Layer

### Foods Database (254 items)

USDA-accurate per 100g values for:
- Protein (g) · Carbs (g) · Fat (g) · Calories (kcal) · Cost ($) · Meat type · Cut · Diet flags · Allergens

Examples:
- `Chicken breast` — 31g protein per 100g, $0.80
- `Greek yogurt (nonfat)` — 10g protein per 100g, $0.40
- `Lentils (dry)` — 25g protein per 100g, $0.15

### Recipes Database (82 items)

Per-recipe fields:
- Title · Ingredients (with grams) · Macros · Cost · Cook time · Diet flags

### Sides Database (34 items)

5 categories: Grains · Vegetables · Beans (13 varieties) · Fats · Fruit

### Stores (9)

Each with a price multiplier applied to the baseline Walmart cost. Multipliers were derived from publicly available 2024 price comparison studies.

### Supplements (16)

3 phases:
- **Foundation:** Multivitamin, D3+K2, Creatine, Magnesium Glycinate, Fish Oil
- **Optimize:** CoQ10, Berberine, Ashwagandha KSM-66, NAC, Taurine
- **Elite:** NMN, Tongkat Ali, Shilajit, Boron, L-Citrulline, Quercetin

Each supplement: dosage, timing, source citation, Amazon affiliate link, optional ✓ "I take this" toggle.

### Functional Foods (16)

Bioavailability + recovery foods: papaya, pineapple, pomegranate, beets, blueberries, dark chocolate, etc. Each defaults to OFF.

### Fiber Protocol (8)

Chia, psyllium, ground flax, oats, blackberries, etc. — all default OFF.

---

## UI/UX Design System

### Typography (2026 Standards)

| Role | Font | Why |
|------|------|-----|
| Display / Numbers | **Bebas Neue** | Used by Nike, Adidas. Tall, condensed, commanding. Excellent at large sizes. |
| Headers / Labels | **Oswald** | 2026 standard for gym/strength apps. Replaces Barlow Condensed. |
| Body / UI | **Inter** | Industry standard for data-forward apps (Figma, Linear, Vercel). |

Letter-spacing standards:
- Eyebrows: `.28em` (very wide for clinical feel)
- Headers: `.06–.18em`
- Body: `.01–.02em`

### Color Systems (3 Themes)

Switchable in Settings → 🎨 Color System:

**A. Stealth Operator (default)**
- Background: navy-black `#090909`
- Accent: lime `#C8FF00`
- Secondary: warm orange `#FF6B35`

**B. BioHacker Gradient**
- Background: charcoal with flowing gradients
- Multi-color section accents

**C. Monochrome**
- Pure black/white
- Maximum contrast for accessibility

All three force `color-scheme:dark` on the HTML element — light mode never auto-triggers.

### Spacing Scale

- 4px / 6px / 8px / 10px / 12px / 14px / 16px / 18px / 20px / 24px / 28px / 32px

### Border Radius

- `--r: 10px` (default buttons, inputs)
- `--r2: 14px` (cards)
- `50%` for circles (avatars, indicator rings)

### Animations

All transitions use **`cubic-bezier(.25,.46,.45,.94)`** — Apple's iOS curve.

- Panel transitions: 0.2s
- Button press: 0.15s
- Modal slide-up: 0.25s
- Tour tooltip: 0.18s
- Tab wheel: 0.14s

### Micro-interactions (2026 native feel)

- All buttons: `scale(.96)` on press
- Preset buttons: `scale(.94)`
- Store cards: `scale(.97)`
- Meal cards: `scale(.99)`
- Nav icons: `scale(.92)` on tap, `scale(1.12)` when active
- `-webkit-tap-highlight-color:transparent` everywhere
- `touch-action:manipulation` removes 300ms tap delay on iOS

---

## State Management

### gameState (localStorage key: `macroGame`)

```javascript
{
  userName: 'KCTW',
  userGoal: 'Build Muscle & Strength',
  xp: 1250,
  level: 4,
  badges: ['first_log', 'streak_3', ...],
  streak: 7,
  lastLogDate: '2026-04-30'
}
```

### userPrefs (localStorage key: `macroPrefs`)

```javascript
{
  weightUnit: 'lbs',     // or 'kg'
  volumeUnit: 'oz',      // or 'g'
  currency: 'USD'        // 'EUR', 'GBP'
}
```

### Other localStorage keys

| Key | Purpose |
|-----|---------|
| `macroRoutine` | Custom edited daily routine (overrides default) |
| `macroWeek` | Custom edited weekly split |
| `macroTrainingDays` | 1–7, persists across sessions |
| `macroTheme` | A / B / C color system |
| `macroBloodType` | O / A / B / AB or empty |
| `macroLiteMode` | '1' or '0' |
| `macroCarbGoal` | Build / Recomp / Cut |
| `macroCarbWeight` | User weight for carb calc |
| `macroTourSeen` | Array of seen tab numbers |
| `macroTourSkipped` | '1' if user hit skip |
| `macroAffClicks` | Affiliate link click tracking |
| `macroWeightLog` | Weight log entries |
| `macroLogs` | Daily intake logs |

### IndexedDB stores

```
macroDB
├── logs        — daily intake history
├── weights     — weight log entries
├── prefs       — food/cut preferences
└── customFoods — user-added foods
```

---

## Modal Layering System

The single most important architectural decision after single-file: a **modal registry** that tracks open modals and toggles a `body.modal-open` class for global state.

```javascript
const _openModals = new Set();

function registerModalOpen(id) {
  _openModals.add(id);
  document.body.classList.add('modal-open');
}

function registerModalClose(id) {
  _openModals.delete(id);
  if (_openModals.size === 0) {
    document.body.classList.remove('modal-open');
  }
}
```

CSS rule:
```css
body.modal-open .search-fab,
body.modal-open .music-fab {
  opacity: 0 !important;
  pointer-events: none !important;
  transform: scale(.7) !important;
}
```

Every modal (9 in total) is hooked into the registry on open and close. This solved the original obstruction bug where FABs floated on top of modal content.

---

## User Journey

### First-Time User

1. Opens the URL or HTML file
2. Onboarding overlay appears (z-1000)
3. Enters first name → "Let's Go →"
4. Selects goal (Build / Cut / Performance / Testosterone)
5. Welcome splash with their name in 68px Bebas Neue
6. Double confetti burst + personalized toast (+50 XP)
7. Tour tooltip appears on Panel 1 (Target) explaining what to do
8. User taps Next → tour walks through all 9 panels
9. User commits and starts using the app

### Returning User

1. Opens URL
2. App loads to Panel 1 (Target) regardless of previous panel
3. No tour — already seen
4. No onboarding — name exists
5. All preferences (theme, units, training days, custom routine) restored from localStorage

### Power User

1. Opens Settings → adjusts color system, units, currency
2. Opens Schedule → edits routine times, renames meals, removes unused rows
3. Opens Plan → generates meal plan, swaps foods, adds sides
4. Opens Connect → exports plan to calendar, shares grocery list
5. Opens Music FAB → streams KCTW while training

---

## Build History & Decisions

### Phase 1: Foundation (March 18, 2026)

- Single-file HTML architecture decision
- 254-food USDA database compiled
- Core panels (1–4) built: Target, Prefs, Plan, Cost
- Basic CSS theme (single color system)

### Phase 2: Expansion (Late March 2026)

- Panel 5 (Schedule) with hardcoded routine
- Panel 6 (Protocols) — supplements, fiber, T-protocol
- IndexedDB integration for logs and custom foods

### Phase 3: Gamification (Early April 2026)

- XP system + 10 levels
- 16 achievement badges
- Streak tracker
- Onboarding with name capture

### Phase 4: AI Integration

- Claude API integration via proxy
- CHAT FAB with conversation drawer
- Context-aware prompts (passes user's protein target, store, diet)

### Phase 5: Monetization Infrastructure

- Amazon affiliate links on 16 supplements
- FTC disclosure footer
- Gumroad source code listing ($49)
- Email capture modal
- White-label inquiry button

### Phase 6: Polish & UX (April 2026)

- Three color systems (Stealth Operator, BioHacker, Monochrome)
- Blood type profile system
- Carb target calculator
- Myostatin reduction protocol
- Tab tour system
- About / Science / Privacy modal pages

### Phase 7: 2026 Modernization

- Typography upgrade: Bebas Neue + Oswald + Inter
- Micro-interactions: tap scale feedback throughout
- Panel transitions: cubic-bezier easing
- Modal layering manager
- Forced dark mode

### Phase 8: Long-Press Tab Wheel (Final)

- Replaced 9-tab nav with single button
- iPhone picker-style horizontal wheel
- Web Audio API tick sound
- Haptic vibration on boundary cross
- Long-press detection (280ms threshold)

### Phase 9: Edit Mode (Current Build)

- Fully editable daily routine (rename, retime, add, remove, reset)
- Fully editable weekly split
- Settings personalization (units, currency)
- All food/supplement/fiber defaults set to OFF

### Phase 10 (Next): Plan + Protocols Edit Mode

- Custom supplements with user dosages and timing
- Rename meals, save custom serving sizes
- Save favorite meal combos as templates

### Key Decisions Made

| Decision | Rationale |
|----------|-----------|
| Single-file HTML | Distribution + ownership + privacy |
| No accounts | Friction kills first-use, friction kills shares |
| No subscriptions (yet) | Build trust and user base first |
| Default everything OFF | User opt-in is more meaningful than opt-out |
| Force dark mode | Brand consistency, prevents jarring auto-light |
| Bebas Neue for numbers | Industry standard, looks expensive |
| Three color systems | Lets users feel ownership of the app |
| Long-press wheel | Differentiated UX, looks premium |

### Bug Fixes Throughout

1. **Cloudflare script injection** — corrupted JS boundary, removed
2. **File truncation** — full reinit block restored after `renderFiber()`
3. **Panel 9 out of order** — moved to follow Panel 8
4. **Duplicate `sendAiMessage`** — wrapper removed, inlined `saveAiHistory`
5. **iOS scroll** — `position:fixed` app shell, no body.style.overflow manipulation
6. **Tour overlapping onboarding** — 3 hard gates added
7. **Light mode auto-trigger** — forced `color-scheme:dark`
8. **FAB obstruction** — modal layering manager
9. **All defaults reset to OFF** — `ffSelected`, `suppSelected`, `fiberSelected`, `enabledCuts` all start empty
10. **Tab wheel sideways** — wheel was full-height blocking the page; redesigned as 180px bottom strip
11. **Wheel centering math** — added `-itemWidth/2` offset for proper indicator alignment
12. **`setWeightUnit` collision** — calc and prefs both used same name; renamed prefs to `setPrefWeightUnit`

---

## Monetization Strategy

### Sequence

1. **Amazon Associates affiliate links** (Day 1 — passive revenue from first user)
2. **Gumroad source code listing** ($49 — Day 2)
3. **Content marketing** (X + TikTok simultaneously, Days 3–7)
4. **Pro paywall** at 100 users (advanced features behind subscription)
5. **Native app** ($500/mo App Store / Play Store fees, justified at 500+ MAU)
6. **Flippa exit** (Long-term, 24–36× monthly revenue)

### Affiliate Compliance

- 16 supplements link to Amazon with associate tag
- FTC disclosure visible: "As an Amazon Associate I earn from qualifying purchases"
- Personal email acceptable for Amazon Associates
- Must make 3 sales in 180 days or account closes

### Content Channels (Recommended)

| Platform | Audience | Content Type |
|----------|----------|--------------|
| X (Twitter) | 35–50 optimization audience | Text threads, screenshots |
| TikTok | 18–35 biohacking audience | App walkthroughs, supplement stack |
| Instagram | Both | Add at Day 30, repurpose proven content |
| Facebook | Skip | Acquisition cost too high for this niche |

---

## Performance & Optimization

### Load Time

- Initial parse: ~80ms on modern mobile
- First paint: ~120ms
- Interactive: ~200ms
- No external API calls until user opts into AI chat

### Bundle Size

- Total: ~465KB (uncompressed)
- ~150KB CSS
- ~315KB JS (includes 254-food database, 82 recipes, all UI HTML)

### Optimizations Applied

- **Inline everything** — no external CSS/JS files
- **Touch-action: manipulation** — removes 300ms tap delay
- **Will-change** on animated transforms
- **Backdrop-filter** with `-webkit-` prefix for Safari
- **Cubic-bezier** custom curves (faster perceived motion)
- **`position:fixed` app shell** — prevents iOS scroll quirks

### Browser Support

| Browser | Status |
|---------|--------|
| Safari iOS 14+ | ✅ Primary target |
| Chrome 90+ | ✅ Fully supported |
| Firefox 88+ | ✅ Fully supported |
| Edge 90+ | ✅ Fully supported |
| Older browsers | ⚠️ Degrades gracefully (no haptics, no Web Audio) |

---

## Privacy & Compliance

### Data Collection

**Zero data collection.** No telemetry, no analytics, no error reporting, no third-party tracking.

### Local Storage

All user data lives in:
- `localStorage` (small key-value pairs)
- `IndexedDB` (larger structured data)

Both are scoped to the device and the origin (`macroappbykctw.netlify.app`). No data transmitted unless user explicitly opens AI chat (Anthropic API call) or clicks an affiliate link (Amazon redirect).

### Affiliate Links

Disclosed inline with FTC compliance language. No tracking of clicks beyond Amazon's standard associate cookie.

### AI Chat

User messages sent to Anthropic Claude API via proxy. No PII transmitted unless user types it. Anthropic's privacy policy governs that data flow.

### Children's Privacy

App is for adults 18+. No COPPA concerns since no accounts and no data collection.

### Privacy Page

Dedicated modal accessible from Connect panel covering:
- 🔒 No Data Collection
- 📱 Local Storage Only
- 🚫 No Ads. Ever.
- 📧 Optional Email Capture
- 🤖 AI Chat (Anthropic API)
- 🍪 No Cookies
- 👶 Children's Privacy
- 📬 Contact via IG @prodbykctw

---

## Edit Mode & Personalization

### Schedule Panel — Fully Editable

**Daily Routine:**
- Tap meal name to rename
- Tap subtitle to edit
- Change time via picker
- × to remove row
- + Add Routine Item
- ↺ Reset to default

**Weekly Split:**
- Rename any day's activity
- Change workout time
- Training days toggle (1–7) persists
- ↺ Reset week to default

All changes save to `macroRoutine` / `macroWeek` in localStorage.

### Settings — User Preferences

- **Weight Unit:** LBS / KG
- **Food Servings:** OZ / G
- **Currency:** USD / EUR / GBP
- **Color System:** Stealth Operator / BioHacker / Monochrome
- **Lite Mode:** hide gamification, simplify UI
- **Notifications:** 5 daily slots
- **Blood Type Profile:** O / A / B / AB
- **Restart App Tour**
- **Export Backup / Import Backup / Reset All Data**

### Phase 2 (Next Build)

- Protocols — add custom supplements with own dosages/timing
- Plan — rename meals, save custom servings, favorite combos

---

## Distribution & Deployment

### Current

- **Netlify static hosting** — drag-and-drop deploys to `macroappbykctw.netlify.app`
- **Source code sale** — $49 on Gumroad (manual fulfillment)
- **File sharing** — text, email, AirDrop

### Recommended Next Steps

1. **GitHub repository** — public mirror for community feedback
2. **Custom domain** — `macroapp.com` or similar ($10–15/year)
3. **PWA manifest** — installable as iOS/Android home screen app
4. **Service Worker** — true offline mode for AI chat fallback
5. **App Store submission** — wrap in Capacitor/Cordova for native distribution

### GitHub Setup

```bash
# Initialize repo
git init
git add macro-protein-planner.html README.md
git commit -m "Initial MACRO v2.4 release"

# Push to GitHub
git remote add origin https://github.com/[username]/macro-app.git
git push -u origin main

# Enable GitHub Pages from Settings → Pages → main branch
# Result: https://[username].github.io/macro-app/
```

Recommended `README.md` structure:
- Project description
- Live demo link
- Screenshot grid
- Feature list
- Quick start (just open the HTML file)
- License (MIT or proprietary)
- Author/contact

---

## Technical Debt & Roadmap

### Known Technical Debt

1. **No build system** — works fine, but harder to optimize CSS/JS automatically
2. **No tests** — manual QA only
3. **All state in localStorage** — quota limits (~10MB) eventually become a problem
4. **No type safety** — vanilla JS, refactoring is risky
5. **Inline styles vs CSS classes** — some inconsistency throughout
6. **No A/B testing infrastructure** — every UX decision is made by gut feel
7. **Affiliate link tracking is rudimentary** — `macroAffClicks` is local, doesn't aggregate

### Short-Term Roadmap

- [ ] Phase 2 edit mode (Plan + Protocols custom items)
- [ ] Update SoundCloud link if KCTW publishes new releases
- [ ] Wger exercise API integration for workout exercise images
- [ ] PWA manifest for home-screen install

### Medium-Term

- [ ] Custom domain
- [ ] Service Worker for offline AI chat fallback (cache common Q&A)
- [ ] Light mode option (currently force-dark)
- [ ] Apple Health / Google Fit integration
- [ ] Workout video embed (YouTube playlists by movement)

### Long-Term

- [ ] Native iOS app via Capacitor
- [ ] Pro tier ($9.99/mo) — unlocks deeper analytics, custom meal plans, priority AI
- [ ] Community features (recipe sharing, before/after photos)
- [ ] Exit to acquirer via Flippa (24–36× monthly revenue)

---

## Senior Dev Notes

### What Worked

- **Single-file architecture.** This was the right call. Distribution + privacy + ownership all flow from this.
- **Vanilla JS.** No framework lock-in. Easy to read, easy to modify, AI-friendly.
- **Default everything OFF.** Forces the user to engage actively. Meaningful selections.
- **Three color systems.** Users feel ownership of the app. Increases retention.
- **Modal registry pattern.** Prevented every obstruction bug we encountered.
- **Bebas Neue + Oswald + Inter.** Premium feel without paying for licensed fonts.

### What Didn't Work (Initially)

- **Original tab wheel** — full-height overlay blocked everything. Fixed by making it a 180px bottom strip.
- **Pre-selected defaults** — confused users who didn't know what they were opting out of.
- **Light mode** — auto-trigger from system preference broke the visual identity. Forced dark.
- **Tour firing during onboarding** — race condition between init timers. Fixed with 3 hard gates.
- **`setWeightUnit` collision** — calc and prefs used identical function name and DOM IDs. Renamed prefs version.

### Lessons Learned

1. **Force defaults that match brand identity.** Don't let `prefers-color-scheme` override your intended look.
2. **Test on real devices, not just desktop browser.** iOS Safari has quirks (scroll, tap delay, viewport math) that won't show in Chrome DevTools.
3. **Z-index alone isn't enough.** A modal registry that tracks open modals is more reliable than relying on stacking context.
4. **Long-form forms scare users.** Short, multi-step onboarding with one decision per screen wins.
5. **Personalization > Customization.** Asking users to set 50 options up-front fails. Letting them adjust one thing at a time as they discover features wins.
6. **Audit before you ship.** Every "deep audit" found at least one critical bug. Run them.

### Architecture Patterns Worth Reusing

- **Modal registry** — `_openModals` Set + `body.modal-open` class
- **Three-layer state** — in-memory → localStorage → IndexedDB
- **Default-OFF selectors** — opt-in only
- **Hard-gate onboarding** — block proceed until required field filled
- **Tour with origin tracking** — return user to start panel on dismiss
- **Long-press detection** — 280ms threshold with `setTimeout` + `clearTimeout` on touchend
- **Web Audio tick + navigator.vibrate** — native feel without libraries

### When This Architecture Breaks Down

- **More than ~10MB of user data** — localStorage quota hit; need IndexedDB or server
- **Multi-device sync needed** — single-file model can't sync; need backend
- **Real-time features** — chat, leaderboards, social — need WebSockets or polling
- **A/B testing** — requires analytics backend
- **More than 10MB of static data** — file size becomes a load-time issue

For MACRO's current use case, these limits are nowhere close.

---

## Closing

MACRO is a complete men's health optimization platform that ships as one HTML file, runs offline, owns its data, and gives users meaningful agency over their nutrition, training, and supplementation. It was built as a deliberate counter-statement to bloated subscription apps that prioritize engagement over outcomes.

The single-file architecture is the thesis. Everything else flows from it.

If you're reading this as a developer evaluating the codebase, focus on:
1. The modal layering system (cleanest pattern in the app)
2. The three-layer state model (in-memory → localStorage → IndexedDB)
3. The default-OFF philosophy for selectors
4. The tour system with origin tracking
5. The long-press wheel implementation (Web Audio + navigator.vibrate)

These five patterns can be lifted into any single-file app you build next.

---

**Built by KCTW · April 2026**
**Live: [macroappbykctw.netlify.app](https://macroappbykctw.netlify.app)**
**Contact: [@prodbykctw](https://instagram.com/prodbykctw)**
