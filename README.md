# FitLife

## Overview

FitLife is a mobile-first fitness and lifestyle web application built as an AI Product Builder test assignment. It demonstrates a polished consumer flow from acquisition and onboarding through a deterministic personalized workout plan, guided workout completion, progress analytics, and practical nutrition content.

## Live Demo

Add the deployed Vercel URL here.

## Core User Flow

Home → Onboarding → Plan → Workout → Completion → Progress

## Features

- Deterministic personalized 7-day workout plan
- Searchable and filterable workout library
- Guided workout sessions with accurate pause, resume, rest, and audio behavior
- Persisted workout history, streaks, weekly analytics, and activity chart
- Nutrition library with filters and detailed recipes
- Persistent dark and light themes
- UTM acquisition attribution and typed analytics events
- Mobile-first, safe-area-aware layouts suitable for a WebView

## Tech Stack

- React, TypeScript, and Vite
- Tailwind CSS
- React Router
- Zustand
- TanStack Query
- Framer Motion
- Lucide React
- Vitest

## Architecture

Server-like data follows a backend-ready boundary:

```text
UI → TanStack Query hooks → services → typed mock data / future API client
```

TanStack Query owns asynchronous catalog-style state. Zustand owns serializable client state such as onboarding preferences, the generated plan, workout sessions, theme, and locally completed workouts. Service interfaces can move from mocks to a real API without rewriting page components.

## UAC & Analytics

FitLife captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and `utm_term`. The first valid attributed visit is preserved as `firstTouch`, while later attributed visits update `currentTouch`. Events receive a persistent anonymous visitor ID, a per-tab session ID, route context, timestamp, and attribution through a provider-agnostic analytics layer.

The current provider logs events only during development. A production analytics provider can be connected behind the same typed interface.

## Analytics Demo

Append this query to the local or deployed home URL:

```text
?utm_source=google&utm_medium=cpc&utm_campaign=fitness_test&utm_content=creative_01&debugAnalytics=true
```

The explicit `debugAnalytics=true` flag loads a review-only panel showing recent events, anonymous/session identifiers, and first/current-touch attribution. The panel is absent from normal visits and does not expose environment variables or secrets.

## Running Locally

```bash
npm install
npm run dev
```

Copy `.env.example` only when configuring an API endpoint. Vite exposes every `VITE_*` value to the browser, so these variables must never contain secrets.

## Testing

```bash
npm run test
npm run lint
```

## Production Build

```bash
npm run build
npm run preview
```

Route modules are code-split, and `vercel.json` provides the SPA fallback required for direct route loads and refreshes on Vercel.

## WebView Readiness

The app uses touch-friendly controls, dynamic viewport units, mobile safe-area insets, SPA navigation, resilient local storage access, early UTM capture, and no popup- or hover-dependent critical flows. No native bridge is included.

## Future Improvements

- Replace typed mocks with a real backend and cloud sync
- Connect a production analytics provider
- Add authentication when server-backed user accounts are required
