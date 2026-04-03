# Roadmap: Personalized Workout Planner

## Overview

This roadmap builds the MVP from foundation to a usable personal workout-planning experience. We start by establishing the app shell, authentication, and per-user data ownership, then capture onboarding inputs that define personalization. Once the deterministic planning engine and exercise library exist, we layer in the weekly schedule and workout details, then add simple progress tracking and wrap with responsive MVP polish.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation and Auth** - Create the Next.js foundation, authentication flow, and per-user data boundaries.
- [x] **Phase 2: Fitness Profile Onboarding** - Collect the inputs needed to personalize a workout plan.
- [ ] **Phase 3: Deterministic Plan Generator** - Build the exercise library and rule-based 7-day plan generation logic.
- [ ] **Phase 4: Weekly Plan Experience** - Show the generated schedule, workout details, and manual regeneration flow.
- [ ] **Phase 5: Progress Tracking** - Let users mark workouts complete and review completion history.
- [ ] **Phase 6: MVP UX Polish** - Tighten responsive behavior and end-to-end usability for the MVP release.

## Phase Details

### Phase 1: Foundation and Auth
**Goal**: Establish the project foundation with the preferred stack, user authentication, and secure per-user data ownership.
**Depends on**: Nothing (first phase)
**Requirements**: [AUTH-01, AUTH-02, AUTH-03, AUTH-04, UX-02]
**Success Criteria** (what must be TRUE):
  1. User can create an account, sign in, and sign out with email/password.
  2. Authenticated sessions persist across refresh and protected pages reject unauthenticated access.
  3. User data access is scoped so each user only sees their own records.
**Plans**: 4 plans

Plans:
- [x] 01-01-PLAN.md — Scaffold the Next.js App Router, Tailwind/shadcn baseline, and Prisma auth schema
- [x] 01-02-PLAN.md — Implement Auth.js credentials auth, persistent sessions, signup, onboarding redirect, and protected routing
- [x] 01-03-PLAN.md — Build the public/auth UI, authenticated shell, and ownership-safe UX refinements
- [x] 01-04-PLAN.md — Add the Vitest validation baseline and Phase 1 automated test scaffolding

### Phase 2: Fitness Profile Onboarding
**Goal**: Capture the user profile attributes needed for deterministic personalization.
**Depends on**: Phase 1
**Requirements**: [PROF-01, PROF-02, PROF-03, PROF-04]
**Success Criteria** (what must be TRUE):
  1. Signed-in user can create or update a fitness profile with goal, level, equipment, and frequency.
  2. Onboarding flow validates allowed values and stores them correctly.
  3. Completing onboarding positions the user to generate a first weekly plan immediately.
**Plans**: 2 plans

Plans:
- [x] 02-01-PLAN.md — Create the profile data model, shared onboarding/edit form, and settings entry flow
- [x] 02-02-PLAN.md — Finalize completion state, success feedback, and post-onboarding routing

### Phase 3: Deterministic Plan Generator
**Goal**: Build the internal exercise library and deterministic logic that creates a 7-day plan from user inputs.
**Depends on**: Phase 2
**Requirements**: [PLAN-01, PLAN-02, PLAN-04]
**Success Criteria** (what must be TRUE):
  1. Completing onboarding generates a deterministic 7-day plan for the current user.
  2. The generated plan changes based on goal, level, equipment, and training frequency inputs.
  3. Every generated workout is composed from the predefined internal exercise library only.
**Plans**: 3 plans

Plans:
- [ ] 03-01-PLAN.md — Model the exercise library, seed curated content, and add query helpers
- [ ] 03-02-PLAN.md — Implement fixed templates and the rule-based generation service
- [ ] 03-03-PLAN.md — Persist generated plan snapshots and connect first-plan generation to the next-step flow

### Phase 4: Weekly Plan Experience
**Goal**: Present the user's current weekly plan with clear navigation into workout details and manual regeneration.
**Depends on**: Phase 3
**Requirements**: [WORK-01, WORK-02, WORK-03, PLAN-03]
**Success Criteria** (what must be TRUE):
  1. User can view the current 7-day plan in a weekly schedule layout.
  2. User can open any scheduled workout to see exercise order, guidance, and text descriptions.
  3. User can manually regenerate a new plan and see the updated schedule.
**Plans**: 3 plans

Plans:
- [ ] 04-01: Build weekly schedule page and current-plan data loading
- [ ] 04-02: Build workout detail page with exercise descriptions and guidance
- [ ] 04-03: Add manual regenerate flow with replacement-plan handling

### Phase 5: Progress Tracking
**Goal**: Add lightweight completion tracking so users can record follow-through over time.
**Depends on**: Phase 4
**Requirements**: [PROG-01, PROG-02, PROG-03]
**Success Criteria** (what must be TRUE):
  1. User can mark a scheduled workout as completed.
  2. Weekly schedule visibly reflects completion status.
  3. User can review previously completed workouts in a simple history view.
**Plans**: 2 plans

Plans:
- [ ] 05-01: Add workout-completion persistence and schedule status updates
- [ ] 05-02: Build completion history view and basic filtering/order

### Phase 6: MVP UX Polish
**Goal**: Ensure the core flows feel coherent and usable across desktop and mobile for MVP release.
**Depends on**: Phase 5
**Requirements**: [UX-01]
**Success Criteria** (what must be TRUE):
  1. Onboarding, weekly plan, workout detail, and completion tracking flows work on common mobile and desktop sizes.
  2. Core empty, loading, and error states are present for MVP-critical pages.
  3. The app feels clean and coherent enough to use as a personal planner end to end.
**Plans**: 2 plans

Plans:
- [ ] 06-01: Improve responsive layouts and shared UI states across core pages
- [ ] 06-02: Run MVP flow QA and close usability gaps discovered during testing

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation and Auth | 4/4 | Complete | 2026-04-03 |
| 2. Fitness Profile Onboarding | 2/2 | Complete | 2026-04-03 |
| 3. Deterministic Plan Generator | 0/3 | Not started | - |
| 4. Weekly Plan Experience | 0/3 | Not started | - |
| 5. Progress Tracking | 0/2 | Not started | - |
| 6. MVP UX Polish | 0/2 | Not started | - |
