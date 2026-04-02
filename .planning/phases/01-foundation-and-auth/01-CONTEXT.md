# Phase 1: Foundation and Auth - Context

**Gathered:** 2026-04-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the initial Next.js application foundation, implement email/password authentication, persist user sessions, and enforce per-user data boundaries. This phase includes the minimum user and profile-adjacent schema needed to support later onboarding and workout features, but does not add fitness-profile capture, plan generation, or workout functionality.

</domain>

<decisions>
## Implementation Decisions

### Auth Product Flow
- **D-01:** Signup and login use separate pages rather than a combined auth screen.
- **D-02:** Email verification is skipped for Phase 1 to keep MVP auth friction low.
- **D-03:** Forgot-password flow is deferred and not included in Phase 1.
- **D-04:** After successful signup, the user should go directly into onboarding/profile setup rather than landing on a dashboard first.

### Session Behavior
- **D-05:** User sessions should persist until the user manually signs out.
- **D-06:** Do not include a "Remember me" option in Phase 1.
- **D-07:** Multiple concurrent sessions across browsers/devices are allowed without special controls.
- **D-08:** Unauthenticated access to protected pages should redirect the user to the login page.

### Initial App Shell
- **D-09:** Logged-out users should see a minimal landing page with product value and clear login/signup actions.
- **D-10:** Logged-in users who have not completed setup should be routed straight into onboarding/profile setup.
- **D-11:** The MVP should use minimal top navigation rather than introducing a sidebar layout.
- **D-12:** Do not build a polished marketing homepage in Phase 1; keep the public entry experience functional and minimal.

### Data Foundation
- **D-13:** Phase 1 should create auth/user tables plus the minimum profile placeholder schema needed for later phases.
- **D-14:** Each user has exactly one profile record in the MVP.
- **D-15:** Include minimal development seed data needed to support auth and future profile flow work.
- **D-16:** Do not add role support now; every account is a normal user in the MVP.

### the agent's Discretion
- Choose the exact auth library and implementation pattern that best fits Next.js, TypeScript, PostgreSQL, and Prisma.
- Decide the exact schema shape for the profile placeholder as long as it cleanly supports single-profile-per-user expansion in Phase 2.
- Decide the exact public landing-page copy, app-shell styling, and protected-route mechanics.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product Scope
- `.planning/PROJECT.md` — Core product framing, MVP constraints, and non-goals for the workout-planner app.
- `.planning/REQUIREMENTS.md` — Phase-linked requirements, especially `AUTH-01` through `AUTH-04` and `UX-02`.
- `.planning/ROADMAP.md` — Phase 1 goal, success criteria, and plan breakdown.
- `.planning/STATE.md` — Current project position and initialization context.

### Agent Guidance
- `AGENTS.md` — Project-level workflow guidance and summarized constraints for downstream work.
- `CLAUDE.md` — Mirrored project guidance available in the repository root.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None yet: the repository has planning artifacts only, so Phase 1 will establish the initial app structure.

### Established Patterns
- No application code exists yet, so the planner can choose standard Next.js App Router patterns that fit the preferred stack.
- Planning artifacts already lock the product toward deterministic behavior, basic mobile responsiveness, and MVP-first scope control.

### Integration Points
- New application code will become the baseline integration point for all future phases.
- Data modeling in this phase should leave clean extension points for Phase 2 fitness profiles and later plan-generation entities.

</code_context>

<specifics>
## Specific Ideas

- The auth experience should feel simple and low-friction rather than security-heavy for the MVP.
- The first successful signup should feel like the start of setup, not a generic account-created dead end.
- The public-facing experience should be minimal and functional, not a marketing site.

</specifics>

<deferred>
## Deferred Ideas

- Forgot-password flow — deferred beyond Phase 1.
- Email verification — deferred beyond Phase 1.
- Role support or admin-oriented account types — deferred beyond the MVP foundation.

</deferred>

---

*Phase: 01-foundation-and-auth*
*Context gathered: 2026-04-03*
