# ALIGN — Design Prototype

This repository contains the **HTML/CSS/JS design prototype** for ALIGN, an AI-powered weightlifting form coaching app built for CIS 515 – Team 2 at Arizona State University.

The designs in this repo were created interactively and then implemented as a full Next.js + FastAPI application.

## Implementation

The production codebase lives at **[kenvalenzuela/ai-form-coach](https://github.com/KenValenzuela/ai-form-coach)**.

It includes:
- Next.js 15 frontend (the designs from this repo, built in React/TypeScript)
- FastAPI backend with MediaPipe pose extraction and squat analysis pipeline
- Real video upload, rep detection, fault scoring, and AI coach feedback

## Contents of this repo

| Path | What it is |
|---|---|
| `project/ALIGN.html` | The original single-file HTML prototype |
| `app/`, `components/`, `lib/` | Next.js implementation of the prototype (superseded by ai-form-coach) |
| `chats/` | Design conversation transcripts showing how the UI evolved |

## Running the prototype locally

Open `project/ALIGN.html` directly in a browser — no build step needed. It is a self-contained prototype and does not connect to any backend.

To run the full application, see [ai-form-coach](https://github.com/KenValenzuela/ai-form-coach).
