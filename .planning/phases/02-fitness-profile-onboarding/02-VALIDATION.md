---
phase: 02
slug: fitness-profile-onboarding
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-04-03
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for fitness-profile onboarding execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + Testing Library + Prisma smoke checks |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `pnpm vitest run --changed --passWithNoTests` |
| **Full suite command** | `pnpm vitest run && pnpm lint` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm vitest run --changed --passWithNoTests`
- **After every plan wave:** Run `pnpm vitest run && pnpm lint`
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | PROF-01, PROF-02, PROF-03, PROF-04 | schema/validator | `test -f lib/validators/profile.ts && test -f prisma/migrations/0002_profile_onboarding_fields/migration.sql` | ✅ | ⬜ pending |
| 02-01-02 | 01 | 1 | PROF-01, PROF-02, PROF-03, PROF-04 | component/form | `pnpm vitest run tests/profile/profile-form.test.tsx` | ✅ | ⬜ pending |
| 02-01-03 | 01 | 1 | PROF-01 | routing/smoke | `pnpm vitest run tests/profile/profile-settings-routing.test.ts` | ✅ | ⬜ pending |
| 02-02-01 | 02 | 2 | PROF-01, PROF-02, PROF-03, PROF-04 | completion/routing | `pnpm vitest run tests/profile/profile-success-routing.test.ts` | ✅ | ⬜ pending |
| 02-02-02 | 02 | 2 | PROF-01 | full-phase integration | `pnpm vitest run tests/profile/profile-form.test.tsx tests/profile/profile-success-routing.test.ts` | ✅ | ⬜ pending |
| 02-02-03 | 02 | 2 | PROF-01 | build/smoke | `pnpm build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Validation Baseline Prerequisites

Phase 1 already established the shared Vitest baseline. Phase 2 must add and satisfy the following suites during execution:

- [ ] `tests/profile/profile-form.test.tsx` — verifies allowed options, required fields, and shared form rendering
- [ ] `tests/profile/profile-settings-routing.test.ts` — verifies settings/profile edit-route entry and gating behavior
- [ ] `tests/profile/profile-success-routing.test.ts` — verifies completion state, success UI, and next-step routing

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| First-time onboarding save shows a short success state | PROF-01 | Timing and perception of the transition are best checked in-browser | Log in with an incomplete user, submit all four fields, confirm a short success state appears before routing onward |
| Completed user can reopen and edit saved profile values | PROF-01 | Prefill and edit feel are easier to confirm visually | Visit the profile/settings route after completion and confirm saved values are present |
| Mobile form remains tappable and single-column | PROF-01 | Layout/tap target quality is visual | Open onboarding and settings/profile at narrow width and confirm option cards and save button remain usable |

---

## Validation Sign-Off

- [x] All tasks have automated verify commands or existing baseline dependencies
- [x] Sampling continuity preserved
- [x] New Phase 2 test suites are named explicitly
- [x] No watch-mode flags
- [x] Feedback latency < 30s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-04-03
