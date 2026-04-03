# Phase 4 Research: Weekly Plan Experience

**Date:** 2026-04-04
**Phase:** 04-weekly-plan-experience
**Status:** Complete

## Research Summary

Phase 4 should convert the app from a transitional generator flow into the main workout-planning experience. The most important architectural shift is making `/app` the entry point for the active plan while keeping `/next-step` only as a fallback for users who have not generated one yet. The weekly experience should stay simple and explicit: a 7-day card layout with visible rest days, a highlighted current day, and route-driven detail overlays for deeper workout inspection.

## Key Findings

### 1. App Routing Should Pivot Around the Active Plan

- The current app shell still points `App` at a placeholder route.
- Phase 3 already introduced a persisted `WorkoutPlan` snapshot and active-plan semantics.
- The cleanest Phase 4 behavior is:
  - users without an active plan land on `/next-step`
  - users with an active plan land on the weekly schedule view
- This keeps the generator bridge intact without forcing users to revisit it once they have a plan.

### 2. Weekly View Should Be Card-Based and Snapshot-Driven

- The data model already stores the 7-day structure as ordered `WorkoutDay` rows with `WorkoutExercise` children.
- A card-based layout maps cleanly to this snapshot model and works better than a dense table for MVP mobile responsiveness.
- Showing all seven days explicitly avoids ambiguity and supports future completion tracking without restructuring the UI later.
- Rest days should remain visible because they are part of the plan contract, but they can be visually quieter than workout days.

### 3. Route-Driven Modal Is the Best Detail Compromise

- The detail flow needs to feel lightweight, but still support direct routing and ownership-safe loading.
- A route-driven modal layered over the weekly page provides the best balance:
  - the weekly context stays visible underneath
  - detail content can still use server-side data loading and route params
  - future navigation between days remains straightforward
- This route approach also gives a clear seam for not-found handling on inactive or foreign plans.

### 4. Regeneration Belongs Near Profile Editing, Not in the Weekly Canvas

- The user chose settings/profile as the home for manual regenerate.
- Keeping regenerate away from the primary weekly canvas reduces accidental plan replacement.
- The flow should be small and explicit:
  - trigger from profile settings
  - short confirmation step
  - server action creates a new active plan and deactivates the previous one
  - user returns to the weekly plan experience with updated data

## Recommended Implementation Shape

1. Make `/app` resolve the signed-in user and redirect to `/next-step` or the new weekly route based on active-plan presence.
2. Add a weekly plan route that loads the active plan snapshot and renders all seven days as cards.
3. Add route-driven detail UI for individual days, including a simple rest-day detail state.
4. Extend settings/profile with regenerate entry and confirmation, reusing the existing generator service and persistence helper.

## Risks to Watch

- If the modal route structure is too clever, Phase 4 could burn time on routing complexity instead of user value.
- If weekly cards show too much content, the first usable version may become visually noisy on mobile.
- If regenerate confirmation is too hidden or too custom, it will feel inconsistent with the otherwise simple MVP shell.

## Conclusion

Phase 4 should center the product around a clear active-plan experience. `/app` becomes the real plan entry point, the weekly schedule becomes the default authenticated destination once a plan exists, and workout detail plus regenerate remain intentionally lightweight so completion tracking can layer on top cleanly in Phase 5.

---

**Result:** Approved as planning input for Phase 4
