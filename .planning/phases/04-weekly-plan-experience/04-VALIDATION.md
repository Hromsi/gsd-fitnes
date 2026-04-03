---
phase: 04
slug: weekly-plan-experience
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-04-04
---

# Phase 04 — Validation Strategy

> Per-phase validation contract for the weekly-plan-experience phase.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + Testing Library + route/component contract tests |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `pnpm vitest run --changed --passWithNoTests` |
| **Full suite command** | `pnpm vitest run && pnpm lint` |
| **Estimated runtime** | ~45 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm vitest run --changed --passWithNoTests`
- **After every plan wave:** Run `pnpm vitest run && pnpm lint`
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 45 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | WORK-01 | routing/smoke | `pnpm vitest run tests/workouts/weekly-plan-routing.test.ts` | ✅ | ⬜ pending |
| 04-01-02 | 01 | 1 | WORK-01 | component/view | `pnpm vitest run tests/workouts/weekly-plan-view.test.tsx` | ✅ | ⬜ pending |
| 04-02-01 | 02 | 2 | WORK-02, WORK-03 | routing/ownership | `pnpm vitest run tests/workouts/workout-detail-routing.test.ts` | ✅ | ⬜ pending |
| 04-02-02 | 02 | 2 | WORK-02, WORK-03 | component/modal | `pnpm vitest run tests/workouts/workout-detail-modal.test.tsx` | ✅ | ⬜ pending |
| 04-03-01 | 03 | 3 | PLAN-03 | regenerate/flow | `pnpm vitest run tests/workouts/regenerate-plan-flow.test.tsx` | ✅ | ⬜ pending |
| 04-03-02 | 03 | 3 | WORK-01, PLAN-03 | entry/routing | `pnpm vitest run tests/workouts/app-entry-routing.test.ts` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Validation Baseline Prerequisites

Phase 1 established the shared test baseline. Phase 4 must add and satisfy:

- [ ] `tests/workouts/weekly-plan-routing.test.ts`
- [ ] `tests/workouts/weekly-plan-view.test.tsx`
- [ ] `tests/workouts/workout-detail-routing.test.ts`
- [ ] `tests/workouts/workout-detail-modal.test.tsx`
- [ ] `tests/workouts/regenerate-plan-flow.test.tsx`
- [ ] `tests/workouts/app-entry-routing.test.ts`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Weekly cards feel readable and balanced on mobile | WORK-01 | Layout density and tap comfort are visual | Open the weekly plan on a narrow viewport and confirm all seven cards remain readable and tappable |
| Detail modal feels like an overlay, not a route jump | WORK-02 | Visual layering and continuity are interaction judgments | Open a workout card from the weekly plan and confirm the underlying weekly context still feels present |
| Regenerate confirmation is explicit but lightweight | PLAN-03 | The right confirmation tone is best judged by feel | Open settings/profile, trigger regenerate, and confirm the confirmation state is obvious without feeling heavy |

---

## Validation Sign-Off

- [x] All tasks have automated verify commands or earlier baseline dependencies
- [x] Sampling continuity preserved
- [x] New Phase 4 test suites are named explicitly
- [x] No watch-mode flags
- [x] Feedback latency < 45s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-04-04
