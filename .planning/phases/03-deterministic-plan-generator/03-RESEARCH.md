# Phase 03 Research: Deterministic Plan Generator

**Completed:** 2026-04-04
**Status:** Ready

## Summary

Phase 3 should be built as a compact domain layer with four main pieces: a curated exercise library, fixed weekly templates, a generation service, and persisted plan snapshots. The safest MVP approach is to keep the exercise metadata small, use explicit template selection based on profile inputs, and persist the generated result so later UI phases can render it without recomputing.

## Key Takeaways

1. Keep the exercise library small and opinionated.
   A controlled starter set reduces content drift and makes template coverage easier to reason about.

2. Use explicit weekly templates.
   Fixed template structures by frequency and workout-type mix are easier to test and maintain than a fully emergent rule engine.

3. Separate library data from generated snapshot data.
   The exercise library should remain reusable content, while generated plans/workouts become immutable-ish records tied to a user and generation moment.

4. Let profile inputs shape selection differently by dimension.
   - Goal: small volume shifts
   - Level: easier/harder exercise pool selection
   - Equipment: filter or soften selection within allowed equipment groupings
   - Frequency: choose the weekly template and number of training days

5. Preserve older plans.
   Since regeneration later should create parallel plans rather than in-place replacement, the model should support an active/current flag without needing full history UX yet.

## Recommended Direction

- Add small seeded exercise-library tables
- Add plan snapshot tables for plan, workout day, and workout exercise rows
- Implement a generator service with fixed template inputs
- Keep variability light and bounded so tests can assert structure without requiring one exact output

## Risks To Avoid

- Over-designing the library schema before MVP needs it
- Encoding plan data dynamically from the current library instead of snapshotting
- Hiding business rules inside route handlers instead of a reusable service
- Making “soft equipment matching” so loose that it breaks user expectations
