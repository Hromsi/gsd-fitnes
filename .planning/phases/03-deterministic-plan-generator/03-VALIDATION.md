---
phase: 03
slug: deterministic-plan-generator
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-04-04
---

# Phase 03 — Validation Strategy

> Per-phase validation contract for the deterministic plan-generator phase.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + domain/service tests + Prisma smoke checks |
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
| 03-01-01 | 01 | 1 | PLAN-04 | schema/smoke | `test -f prisma/migrations/0003_exercise_library/migration.sql && pnpm prisma:generate` | ✅ | ⬜ pending |
| 03-01-02 | 01 | 1 | PLAN-04 | domain/library | `pnpm vitest run tests/generator/exercise-library.test.ts` | ✅ | ⬜ pending |
| 03-02-01 | 02 | 2 | PLAN-02 | template/domain | `pnpm vitest run tests/generator/plan-templates.test.ts` | ✅ | ⬜ pending |
| 03-02-02 | 02 | 2 | PLAN-01, PLAN-02, PLAN-04 | generation/domain | `pnpm vitest run tests/generator/plan-generation.test.ts` | ✅ | ⬜ pending |
| 03-03-01 | 03 | 3 | PLAN-01 | persistence/domain | `pnpm vitest run tests/generator/plan-persistence.test.ts` | ✅ | ⬜ pending |
| 03-03-02 | 03 | 3 | PLAN-01 | build/smoke | `pnpm build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Validation Baseline Prerequisites

Phase 1 already established the shared Vitest baseline. Phase 3 must add and satisfy:

- [ ] `tests/generator/exercise-library.test.ts`
- [ ] `tests/generator/plan-templates.test.ts`
- [ ] `tests/generator/plan-generation.test.ts`
- [ ] `tests/generator/plan-persistence.test.ts`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| First-plan generation CTA feels clear and singular | PLAN-01 | CTA hierarchy is a UX judgment | Open the next-step page after onboarding and confirm there is one primary `Generate workout plan` action |
| Generated-state bridge still feels transitional | PLAN-01 | The “not yet a full schedule UI” nuance is visual | Generate a first plan and confirm the page still feels like a bridge into Phase 4, not a fake schedule screen |
| Light variability stays bounded | PLAN-02 | Human review helps catch surprising exercise output | Run generation multiple times for the same profile and confirm changes are small and still plausible |

---

## Validation Sign-Off

- [x] All tasks have automated verify commands or earlier baseline dependencies
- [x] Sampling continuity preserved
- [x] New generator-domain tests are named explicitly
- [x] No watch-mode flags
- [x] Feedback latency < 30s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-04-04
