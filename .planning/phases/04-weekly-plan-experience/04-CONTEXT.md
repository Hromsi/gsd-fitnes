# Phase 4: Weekly Plan Experience - Context

**Gathered:** 2026-04-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Present the user's active 7-day workout plan in a usable weekly view, add route-driven workout detail browsing, and introduce manual plan regeneration from settings. This phase builds the core plan-consumption UX, but does not yet add completion tracking.

</domain>

<decisions>
## Implementation Decisions

### Weekly Plan View
- **D-01:** The weekly plan should use a simple card-based 7-day layout rather than a bare list.
- **D-02:** Rest days stay visible in the weekly view, but with a lighter visual treatment than workout days.
- **D-03:** The current day should be highlighted in the weekly view.
- **D-04:** Workout-day cards should show day label, workout type, and a short exercise preview.

### Workout Detail
- **D-05:** Workout details should open as a route-driven modal layered over the weekly view.
- **D-06:** Detail content must include day label, workout type, guidance, exercise list, and text descriptions.
- **D-07:** Rest days should also have a simple detail state.
- **D-08:** Detail flow should include next/previous navigation between days.

### Regenerate Flow
- **D-09:** Manual regenerate entry lives in `settings/profile`, not inside the main weekly canvas.
- **D-10:** Regeneration requires a short confirmation step.
- **D-11:** A newly generated plan becomes active while older plans remain stored in history.
- **D-12:** After regeneration, the user stays on the weekly plan experience with refreshed data.

### Routing and Empty States
- **D-13:** If the user has no active plan, `App` should route to `next-step`.
- **D-14:** If the user has an active plan, `App` should route directly into the weekly plan view.
- **D-15:** Direct detail access for inactive historical plans is out of scope for MVP and should redirect or return not found.
- **D-16:** `next-step` remains only as a fallback for users without an active plan.

### Agent Discretion
- Decide the exact route structure that best supports a route-driven modal while keeping ownership checks straightforward.
- Decide how much exercise preview to show on weekly cards before the detail modal takes over.
- Decide the smallest regenerate confirmation UX that still prevents accidental replacement of the active plan.

</decisions>

<canonical_refs>
## Canonical References

- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/STATE.md`
- `.planning/phases/03-deterministic-plan-generator/03-CONTEXT.md`
- `.planning/phases/03-deterministic-plan-generator/03-03-SUMMARY.md`
- `AGENTS.md`
- `CLAUDE.md`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Phase 3 already persists active workout plan snapshots with workout days and ordered workout exercises.
- `next-step` already handles explicit first-plan generation and active-plan-aware messaging.
- The authenticated shell and top navigation are already established inside `app/(app)`.

### Established Patterns
- User-owned data access should continue through secure current-user helpers and ownership checks.
- MVP UI remains intentionally clear and lightweight rather than dashboard-heavy.
- Tests prefer focused Vitest suites that assert route contracts, shell behavior, and component states.

### Integration Points
- Weekly view should consume the active `WorkoutPlan` snapshot produced in Phase 3.
- Settings/profile is the approved home for regenerate entry.
- Phase 5 completion tracking will extend the weekly cards and detail view built here, so card/modal boundaries should stay clean.

</code_context>

<specifics>
## Specific Ideas

- Keep the weekly layout readable on mobile before adding any advanced interactions.
- Use route structure that can support a modal overlay without duplicating the whole plan-loading stack.
- Treat `App` as the primary entry point into the current workout experience, not a placeholder.

</specifics>

<deferred>
## Deferred Ideas

- Completion toggles and workout history
- Historical plan browsing UI
- In-canvas regenerate controls
- Rich schedule analytics or calendar behavior
- Deep-link support for inactive historical plan details

</deferred>

---

*Phase: 04-weekly-plan-experience*
*Context gathered: 2026-04-04*
