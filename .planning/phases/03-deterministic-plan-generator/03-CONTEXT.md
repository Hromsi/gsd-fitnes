# Phase 3: Deterministic Plan Generator - Context

**Gathered:** 2026-04-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the internal exercise library and the deterministic rule-based logic that creates a 7-day workout plan from the user's saved profile. This phase defines the domain model and generation rules, but does not yet build the full weekly plan browsing UX.

</domain>

<decisions>
## Implementation Decisions

### Exercise Library Structure
- **D-01:** The MVP exercise library should stay small and controlled.
- **D-02:** Each exercise stores `name`, `description`, `equipment`, `level`, and `category`.
- **D-03:** Exercises should already be grouped by workout types such as `upper`, `lower`, `full_body`, `core`, and `cardio`.
- **D-04:** Replacement logic is out of scope for this phase.

### Generation Rules
- **D-05:** Goal influences generation primarily through modest volume changes.
- **D-06:** Fitness level influences generation primarily through exercise difficulty selection.
- **D-07:** Equipment should influence selection softly rather than through an overly rigid matrix.
- **D-08:** Training frequency changes the number of training days in the 7-day cycle.
- **D-09:** Use fixed weekly templates as the backbone of the generator.

### Generated Plan Format
- **D-10:** Each generated workout stores day label, workout type, exercise list, and short sets/reps or duration guidance.
- **D-11:** Each generated exercise entry stores an exercise reference plus order only.
- **D-12:** Rest days should be represented explicitly in the weekly plan.
- **D-13:** Plans should be saved as snapshots at generation time.
- **D-14:** Version/history support is deferred; one current active plan is enough for now.

### Generation Behavior
- **D-15:** The first plan is not generated automatically after onboarding; generation happens only on explicit user action.
- **D-16:** Re-generation should preserve older plans rather than replacing them in place.
- **D-17:** Light variability is allowed; the output does not need to be perfectly identical for the same profile every time.
- **D-18:** Profile changes do not automatically regenerate the plan.
- **D-19:** Regenerate UI is deferred; this phase should focus on domain and generation support first.

### Agent Discretion
- Decide the exact database model boundaries between exercise library data, plan snapshots, workouts, and workout exercises.
- Decide how to encode fixed weekly templates cleanly so later UI phases can consume them without rework.
- Decide the minimum safe amount of variability that still feels controlled and testable.

</decisions>

<canonical_refs>
## Canonical References

- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/STATE.md`
- `.planning/phases/02-fitness-profile-onboarding/02-CONTEXT.md`
- `.planning/phases/02-fitness-profile-onboarding/02-UI-SPEC.md`
- `AGENTS.md`
- `CLAUDE.md`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Phase 2 now persists the full fitness profile and marks onboarding completion explicitly.
- The authenticated shell already includes a next-step placeholder after onboarding, which can later connect to generation flows.
- Prisma, server actions, and strict validator patterns are already established in the codebase.

### Established Patterns
- User-scoped data access should continue to resolve through secure current-user helpers.
- MVP UI remains intentionally simple and deterministic-looking rather than highly dynamic.
- Tests currently validate domain contracts and shell behavior via focused Vitest suites.

### Integration Points
- Generation inputs come from the saved `Profile` record.
- This phase must create the data foundation that later schedule/detail/progress phases will read.
- Since plan generation is not auto-triggered after onboarding, the output should be reachable through explicit domain/service flows rather than immediate UI hooks.

</code_context>

<specifics>
## Specific Ideas

- Keep the exercise set intentionally small enough to reason about and test.
- Prefer explicit templates and lookup tables over clever algorithmic selection.
- Snapshot generated outputs so later library changes do not mutate historical plans.

</specifics>

<deferred>
## Deferred Ideas

- User-facing regenerate button
- Full weekly plan browsing UI
- Exercise replacement chains
- Rich plan history management
- Fully deterministic no-variation output

</deferred>

---

*Phase: 03-deterministic-plan-generator*
*Context gathered: 2026-04-04*
