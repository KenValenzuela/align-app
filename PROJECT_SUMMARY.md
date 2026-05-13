# PROJECT_SUMMARY.md — ALIGN: AI Squat Form Coach

## Project Name and One-Line Description
**ALIGN** — An AI-powered weightlifting form correction prototype (ASU CIS 515, Team 2) that analyzes squat videos using computer vision and delivers specific, plain-language coaching feedback with drill recommendations.

## Problem It Solves
Many gym-goers — especially students at ASU's Sun Devil Fitness Complex — lack access to certified personal coaching. Relying on mirrors or social media for form feedback produces inconsistent technique, increases injury risk (e.g., knee cave, hip hinge errors), and leads to inefficient training. This project provides an accessible, low-cost alternative that fits in a browser.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS, CSS Modules, custom design tokens (Soft Lavender + Near-Black Navy) |
| Prototype Origin | Claude Design (HTML/CSS/JS AI prototype → Next.js implementation) |
| Computer Vision (planned) | Pose estimation (MediaPipe / OpenPose style), joint angle calculation |
| State Management | React hooks + localStorage persistence for workout sessions |

## My Role and Contributions
- Implemented the full Next.js frontend from an AI-generated design prototype (Claude Design export workflow)
- Translated multi-screen HTML/CSS/JS prototype into a structured, production-quality Next.js component architecture
- Built four application sections:
  - **Hero/Landing** — animated grid, form score stats, "How it works" explainer
  - **Video Analyzer** — drag-and-drop upload → simulated CV processing animation → results (form score ring, joint angle table, pose overlay SVG, tabbed issue list)
  - **Workout Tracker** — session logging with exercise/weight/sets/reps, live volume calculations, session history table, localStorage persistence
  - **Routine Builder** — custom training plan creation with rest periods, exercise lists, direct links to Form Analyzer
- Designed the AI Coach feedback panel: conversational chat-bubble coaching cues with specific corrections, drill recommendations, and a "This Week's Focus" priority card
- Built mobile-responsive layout: hamburger navigation, stacked grids, touch-friendly tap targets, horizontally scrollable tables
- Specific AI coaching cues implemented: "Your hips are higher than your knees — make sure you're hitting parallel!", "Your left knee is caving inward by about 18°...", "Your torso is tilting forward at 52°..."

## Key Outcomes and Capabilities
- Upload a side-view squat video → receive a form score (0–100), joint angle breakdown table, pose overlay visualization, and prioritized AI coaching cues
- AI Coach tab delivers specific, actionable feedback with a Cue (cognitive focus), a Drill (practical exercise), and filter controls for fix/improvement/tip categories
- Workout Tracker persists session data across browser refreshes for gym floor use
- Routine Builder creates named training plans linked back to the Form Analyzer
- Fully mobile responsive for in-gym use on phones

## AI/ML/Data Concepts Demonstrated
- **Computer vision (architectural design)** — pose estimation pipeline for joint tracking, angle calculation, and form scoring
- **Structured AI output design** — each coaching cue has a type (fix/improvement/tip), a Cue, and a Drill — demonstrating AI output schema design for product use
- **Prototype-to-production translation** — converted an AI-designed prototype (Claude Design) into maintainable Next.js component architecture
- **User-centric AI feedback** — plain-language coaching output designed for non-technical fitness users at point of use
- **State-driven UI** — multi-step workflow state machine (upload → analyzing → results) with persistent session tracking

## Relevance Tags
- **AI Engineer** — CV model integration design, structured AI coaching output architecture
- **Full-Stack AI Developer** — Next.js frontend implementation, component architecture, state management
- **Product / Data Analyst** — user problem framing, academic project context, fitness domain UX
- **Applied AI** — real-world CV application design for accessible, low-cost coaching
