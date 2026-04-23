# AI Squat Form Coach

_Started 2026-04-22 23:37 UTC_

---

## User

Design a frontend with react (jsx) using these elements and design for AI-Powered Weightlifting Form Correction
CIS 515 – Team 2 (Arizona State University)
Overview
This project is a computer vision–based system that analyzes recorded weightlifting videos and provides automated feedback on exercise form, starting with squat analysis.

The goal is to provide an accessible, low-cost alternative to personal coaching for students at ASU’s Sun Devil Fitness Complex (SDFC).

For a non-technical audience
Think of this as a "video form coach":

You upload a squat video.
The app watches your movement and tracks key body points.
It checks for common form issues.
It gives plain-language feedback and a visual overlay image.
This MVP currently focuses on side-view squats and provides simple, understandable coaching suggestions.

Problem Statement
Many students:

Lack access to certified coaching
Rely on mirrors or social media
Receive inconsistent feedback
This leads to:

Increased injury risk
Poor lifting technique
Inefficient workouts

## Assistant

_[tool: view_image]_

_[tool: update_todos]_

_[tool: update_todos]_

_[tool: write_file]_

Got it — building now!

_[tool: done]_

_[tool: fork_verifier_agent]_

Here's what I built for **ALIGN** — a fully interactive 4-screen prototype:

---

**Screens**
- **Home** — Dark navy hero with animated grid, score stats, and "How it works" section
- **Upload** — Drag & drop zone, exercise picker (with squat-only MVP warning), recording tips
- **Analyzing** — Animated skeleton figure with scanline, live progress bar cycling through CV steps
- **Results** — Form score ring (73/100), pose overlay SVG, joint angle table, tabbed issue list with expandable coaching notes

**Brand** — Soft Lavender `#7B68EE` + Near-Black Navy `#0D1B3E` from your ALIGN identity sheet. DM Sans + DM Mono type pairing.

**Tweaks panel** (toolbar toggle) — swap accent color, jump between screens instantly.

---

Let me know what to refine — copy, additional screens, real backend wiring hints, or anything else!

## User

can you consolidate it into one page and also add a volume / reps / sets tracker + create a routine

## Assistant

_[tool: update_todos]_

_[tool: write_file]_

On it — building the full single-page version now.

_[tool: done]_

_[tool: fork_verifier_agent]_

Here's what's now on the page — one continuous scroll, four sections:

---

**Hero** — Dark navy with grid + glow, tagline, stats

**Analyze** — Upload zone → animated CV skeleton → Results with pose overlay, joint angles, tabbed issues list

**Tracker** — Start a session, log exercise / weight / sets / reps, see live volume calculations, full session history table. Persists across refreshes.

**Routines** — Two pre-loaded SDFC starter plans + a full routine builder (name, exercises, sets × reps, rest, notes). Links back to the Analyzer for form checks.

**Tweaks panel** — Swap accent color, toggle lbs ↔ kg.

---

Let me know what to adjust — copy, colors, adding more exercises, a dashboard/chart view, or anything else!

## User

Add more of the ai coach correction like "Your hips are higher than your knees, make sure you're hitting parallel!"   , make sure there can be a mobile version too

## Assistant

_[tool: read_file]_

_[tool: read_file]_

_[tool: write_file]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Here's what's new:

**🤖 AI Coach tab** (now the default results view) — conversational chat-bubble style feedback from "ALIGN Coach":
- *"Your hips are higher than your knees — make sure you're hitting parallel!"*
- *"Your left knee is caving inward by about 18°… puts serious stress on your ACL"*
- *"Your torso is tilting forward at 52° — this moves the load onto your lower back"*
- *"I noticed a clear slowdown at your sticking point…"*
- Each bubble includes a **Cue** (what to think), a **Drill** (what to practice), and a filter bar to show only fixes, improvements, good form, or tips
- Closes with a **"This Week's Focus"** card — 3 prioritized action items

**📱 Mobile responsive** — hamburger nav, stacked grids, touch-friendly tap targets, horizontally scrollable tables, full-width buttons on small screens

Let me know what else to tweak!

