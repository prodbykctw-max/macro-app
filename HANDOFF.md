# MACRO App — New Session Handoff

I'm continuing work on MACRO, my men's health optimization app. Here's where we are:

## What MACRO Is
A single-file HTML application (~465KB, v2.4) — protein optimizer + biohacker stack for men 18–50. No backend, no accounts, runs offline. Built by me (KCTW, @prodbykctw, IG/music).

## Current Live URL
https://macroappbykctw.netlify.app

## Stack
- Single-file HTML/CSS/JS (no frameworks)
- localStorage + IndexedDB for state
- Google Fonts (Bebas Neue + Oswald + Inter)
- Anthropic Claude API for AI chat
- Hosted on Netlify

## What's Already Built

**9 panels:**
1. 🎯 Target — protein calculator, presets, carb calc
2. 🛒 Prefs — diet, store, allergens, cuts
3. 🍽️ Plan — AI meal generator with swap/sides
4. 💰 Cost — 9-store price comparison
5. 📅 Schedule — daily routine + weekly split (FULLY EDITABLE)
6. 💊 Protocols — supps, foods, fiber, T, myostatin
7. 📈 Progress — logging, XP, badges, streaks
8. 🔗 Connect — exports, IG, About/Science/Privacy modal pages
9. 📖 Recipes — 82 high-protein recipes

**Architecture patterns:**
- Modal layering registry (`_openModals` Set + `body.modal-open` class)
- Three-layer state (in-memory → localStorage → IndexedDB)
- Default-OFF for all selectable items
- Three color systems (Stealth Operator default, BioHacker, Monochrome)
- Long-press tab wheel (single button at bottom, 280ms hold reveals iPhone-style picker)
- Web Audio tick + haptic vibration on wheel scroll
- Forced dark mode (color-scheme:dark)
- Cubic-bezier easing throughout

**Key persisted localStorage keys:**
- `macroGame` (userName, XP, badges, streak)
- `macroPrefs` (weightUnit, volumeUnit, currency)
- `macroRoutine` (custom daily routine)
- `macroWeek` (custom weekly split)
- `macroTrainingDays`, `macroTheme`, `macroBloodType`, `macroTourSeen`

**Defaults:**
- ALL functional foods, supplements, fiber, meat cuts default to EMPTY/OFF
- User must opt in to everything
- App always loads on Panel 1 regardless of session

**Recent work completed:**
- Long-press tab wheel navigation (replaces 9-button nav)
- Full edit mode for Schedule panel (rename rows, retime, add/remove)
- Settings personalization (units, currency)
- All defaults reset to OFF (no pre-selections)
- Tour system with 3 hard gates against onboarding overlap
- Modal layering manager (FABs hide when modals open)
- KCTW music page with 7 DSP links (Spotify, Apple Music, Tidal, Deezer, YouTube Music, Amazon Music, SoundCloud)

## What's On The Roadmap (Phase 2 Edit Mode)
- [ ] Custom supplements with user-defined dosages and timing in Protocols
- [ ] Rename meals, save custom serving sizes in Plan
- [ ] Save favorite meal combos as templates

## Files I'm Uploading
1. `macro-protein-planner.html` — current production build
2. `MACRO-Deck.md` — full 947-line architecture deck (use this as reference)
3. `README.md` — GitHub-ready readme

## How I Work
- Direct, no fluff
- One thing at a time
- I'll test each build and report specific issues
- Quality control is my final review, not Claude's gate
- Don't ask clarifying questions for things you can infer from context
- DO ask clarifying questions for ambiguous design decisions

## What I Want To Do In This Session
[Paste your goal here — e.g. "Build Phase 2 edit mode for Protocols" or "Add PWA manifest" or "Fix [specific bug]"]
