# Phase 2: Fitness Profile Onboarding - Context

**Gathered:** 2026-04-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Capture and persist the user profile inputs required for deterministic workout-plan personalization. This phase adds the real onboarding form, validation, save/update behavior, and completion state, but does not generate the workout plan itself yet.

</domain>

<decisions>
## Implementation Decisions

### Onboarding Flow Shape
- **D-01:** Phase 2 onboarding uses a single page with one form.
- **D-02:** The MVP form stays simple and avoids extra explanatory copy.
- **D-03:** Users fill all fields and submit once at the end.
- **D-04:** Completing onboarding should show a short success state before routing onward.

### Profile Field Rules
- **D-05:** `goal` options are fixed to `lose_weight`, `build_muscle`, `maintain`.
- **D-06:** `fitnessLevel` options are fixed to `beginner`, `intermediate`.
- **D-07:** `equipment` options are fixed to `none`, `home`, `gym`.
- **D-08:** `trainingFrequency` options are fixed to `3`, `4`, `5`.
- **D-09:** All profile fields are required.

### Editing Behavior
- **D-10:** Users can revisit and update their profile after onboarding.
- **D-11:** Editing is available from a dedicated profile/settings page in the MVP shell.
- **D-12:** Editing opens with the user’s current saved values prefilled.

### Completion and Routing
- **D-13:** Onboarding is complete only when all four profile fields are valid and saved successfully.
- **D-14:** After completion, route to a simple placeholder screen indicating plan generation comes next.
- **D-15:** If a completed user returns to onboarding, allow editing rather than forcing a redirect away.

### Agent Discretion
- Decide the exact layout and component structure for the one-page onboarding form.
- Decide the exact success-state treatment as long as it is brief and clearly transitional.
- Decide the exact profile/settings route path that best fits the current app shell.

</decisions>

<canonical_refs>
## Canonical References

- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/STATE.md`
- `.planning/phases/01-foundation-and-auth/01-UI-SPEC.md`
- `AGENTS.md`
- `CLAUDE.md`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Phase 1 already established the top-nav shell, warm neutral palette, auth card patterns, empty-state component, and onboarding route placeholder.
- The database schema already has a `Profile` model linked 1:1 to `User`, including a `setupCompleted` flag.

### Established Patterns
- Authenticated flows use App Router server components and server actions.
- Form validation patterns already exist for auth and can be mirrored for onboarding.
- The authenticated shell uses top navigation only; no sidebar should be introduced in this phase.

### Integration Points
- Saving onboarding data must update the existing `Profile` record for the signed-in user.
- Completion state must set `setupCompleted` so later phases can gate access cleanly.
- The phase should leave a clear handoff into Phase 3’s plan-generation placeholder/entry state.

</code_context>

<specifics>
## Specific Ideas

- Keep onboarding visually lighter than a complex wizard.
- Prefer clear selectable options over open text inputs.
- Make edit mode feel like the same screen, not a separate product area.

</specifics>

<deferred>
## Deferred Ideas

- Actual workout plan generation
- Rich educational/helper copy under each field
- Multi-step onboarding wizard
- Additional profile dimensions beyond the four locked inputs

</deferred>

---

*Phase: 02-fitness-profile-onboarding*
*Context gathered: 2026-04-03*
