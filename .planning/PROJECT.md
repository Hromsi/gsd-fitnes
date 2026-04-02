# Personalized Workout Planner

## What This Is

A web app that gives individual users a simple, structured weekly workout plan without needing a coach. It uses deterministic rules to generate a fixed 7-day plan based on each user's goal, fitness level, available equipment, and preferred training frequency. The MVP is aimed at beginner to intermediate users and prioritizes practical functionality over production polish.

## Core Value

Give each user a clear, usable weekly workout plan that feels personalized without adding complexity or requiring coaching.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Users can create an account and sign in with email and password.
- [ ] Users can set up a fitness profile with goal, level, equipment, and training frequency.
- [ ] Users receive a deterministic 7-day workout plan immediately after onboarding.
- [ ] Users can view their weekly workout schedule and open each workout for details.
- [ ] Users can mark workouts complete and review completion history over time.
- [ ] The app works on desktop and mobile browsers with basic responsive behavior.

### Out of Scope

- Nutrition tracking or meal planning — not part of the MVP's core workout-planning value.
- AI-generated coaching or chat — v1 should stay deterministic and controlled.
- Social features, sharing, or community interactions — not needed for single-user workout planning.
- Advanced analytics, charts, or performance insights — completion tracking is sufficient for MVP validation.
- Admin content management — exercise content can live in a fixed internal library for v1.
- Custom workout editing, exercise swapping, or manual plan building — the generator owns plan structure in v1.

## Context

The product is for individual consumers who want a straightforward workout planner instead of a coach-led experience. Personalization in v1 is rule-based rather than AI-generated and is driven by goal, fitness level, available equipment, and training frequency. After onboarding, the user should immediately receive one fixed 7-day plan and be able to manually regenerate a fresh plan at any time. Exercise content comes from a predefined internal library with text-only descriptions, and progress tracking is intentionally simple: workouts are either complete or incomplete.

## Constraints

- **Tech stack**: Next.js, TypeScript, Tailwind CSS, PostgreSQL, and Prisma — explicitly preferred for the MVP.
- **Product scope**: Beginner to intermediate users only — keeps workout logic and exercise selection controlled.
- **Generator model**: Deterministic templates and fixed exercise library — avoids AI complexity and unstable plan quality.
- **Editing model**: No custom workout editing in v1 — keeps the product simple and controlled.
- **Responsiveness**: Basic mobile responsiveness is required — users should be able to use the app on phones.
- **Release target**: Functional MVP over production polish — prioritize end-to-end usability.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use deterministic workout generation in v1 | Keeps planning logic simple, predictable, and easier to validate than AI-generated output | — Pending |
| Generate a fixed 7-day plan immediately after onboarding | Delivers the core value right away and reduces setup friction | — Pending |
| Allow manual plan regeneration but no automatic weekly regeneration | Gives users control without adding background automation complexity | — Pending |
| Use a fixed internal exercise library with text-only exercise details | Keeps content manageable and avoids media/admin overhead in the MVP | — Pending |
| Keep workout tracking to completion only | Preserves focus on the core planner instead of turning v1 into a full training log | — Pending |
| Support normal multi-user auth with email and password only | Each user needs isolated data, but social auth is unnecessary in v1 | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check -> still the right priority?
3. Audit Out of Scope -> reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-03 after initialization*
