# Phase 02 Research: Fitness Profile Onboarding

**Completed:** 2026-04-03
**Status:** Ready

## Summary

Phase 2 should extend the Phase 1 app shell with a single, server-oriented onboarding form that can work for both first-time completion and later edits. The profile model already exists, so the implementation should focus on strict schema validation, current-value prefill, and explicit completion signaling.

## Key Takeaways

1. Use one server-driven form for both create and edit modes.
   Prefilling current values from the existing `Profile` record keeps the experience simple and avoids building two separate flows.

2. Centralize validation through strict enums/schemas.
   The four onboarding fields are fixed by product decisions, so the safest implementation is a single validation contract shared by the form, server action, and persistence layer.

3. Completion should be explicit.
   Saving valid values should also mark onboarding complete through `setupCompleted = true`, since later phases depend on a clear finished/not-finished boundary.

4. Post-save routing should bridge into later work cleanly.
   Because plan generation does not exist yet, the completion destination should be a short success state or placeholder screen that clearly signals the next milestone without pretending the planner is already built.

## Recommended Direction

- One-page onboarding form
- Required radio/select-style choices only
- Save action updates the signed-in user’s `Profile`
- Completion writes all four values and flips `setupCompleted`
- Completed users can revisit onboarding data through a dedicated profile/settings route

## Risks To Avoid

- Introducing partial-completion semantics now
- Duplicating create/edit code paths
- Adding custom free-text profile fields
- Redirecting completed users away from their own editable onboarding data
