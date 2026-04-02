---
phase: 01
slug: foundation-and-auth
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-04-03
---

# Phase 01 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

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
| 01-01-01 | 01 | 1 | AUTH-04 | config/smoke | `pnpm lint` | ✅ | ⬜ pending |
| 01-01-02 | 01 | 1 | AUTH-04 | schema/smoke | `pnpm prisma:generate` | ✅ | ⬜ pending |
| 01-01-03 | 01 | 1 | AUTH-04 | setup/smoke | `test -f scripts/setup-dev.sh` | ✅ | ⬜ pending |
| 01-04-01 | 04 | 2 | AUTH-01, AUTH-02, AUTH-04, UX-02 | test-baseline | `test -f vitest.config.ts && test -f tests/setup.ts` | ✅ | ⬜ pending |
| 01-04-02 | 04 | 2 | AUTH-01, AUTH-02, AUTH-04 | test-baseline | `test -f tests/auth/auth-config.test.ts && test -f tests/auth/signup-login.test.ts && test -f tests/auth/session-routing.test.ts` | ✅ | ⬜ pending |
| 01-04-03 | 04 | 2 | UX-02 | test-baseline | `test -f tests/ui/landing-page.test.tsx && test -f tests/ui/onboarding-shell.test.tsx && test -f tests/ui/responsive-shell.test.tsx` | ✅ | ⬜ pending |
| 01-02-01 | 02 | 3 | AUTH-02 | integration | `pnpm vitest run tests/auth/auth-config.test.ts` | ✅ | ⬜ pending |
| 01-02-02 | 02 | 3 | AUTH-01 | integration | `pnpm vitest run tests/auth/signup-login.test.ts` | ✅ | ⬜ pending |
| 01-02-03 | 02 | 3 | AUTH-03, UX-02 | integration | `pnpm vitest run tests/auth/session-routing.test.ts` | ✅ | ⬜ pending |
| 01-03-01 | 03 | 4 | UX-02 | component | `pnpm vitest run tests/ui/landing-page.test.tsx` | ✅ | ⬜ pending |
| 01-03-02 | 03 | 4 | AUTH-03 | component/integration | `pnpm vitest run tests/ui/onboarding-shell.test.tsx` | ✅ | ⬜ pending |
| 01-03-03 | 03 | 4 | UX-02 | component | `pnpm vitest run tests/ui/responsive-shell.test.tsx` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Validation Baseline Prerequisites

Delivered by Plan `01-04` in Wave 2 before auth and shell plans run their Vitest verify commands.

- [x] `vitest.config.ts` — base Vitest configuration for App Router project
- [x] `tests/setup.ts` — shared test setup and mocks
- [x] `tests/auth/auth-config.test.ts` — verifies auth config exports and route handler shape
- [x] `tests/auth/signup-login.test.ts` — verifies signup/login happy-path contract
- [x] `tests/ui/landing-page.test.tsx` — verifies CTA copy and public-shell contract
- [x] `tests/ui/onboarding-shell.test.tsx` — verifies onboarding placeholder and top-nav shell
- [x] `tests/ui/responsive-shell.test.tsx` — verifies responsive shell expectations

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Signup redirects directly to onboarding | AUTH-01 | Redirect flow and auth cookie behavior are best confirmed in-browser | Start dev server, create a fresh account on `/signup`, confirm the browser lands on `/onboarding` |
| Session survives refresh on protected route | AUTH-04 | Full browser session behavior depends on cookie handling | Log in, open a protected route, refresh the page, confirm the session remains active |
| Mobile auth shell stays single-column and tappable | UX-02 | Responsive tap-target quality is visual and interaction-based | Open landing/login/signup/onboarding at narrow viewport, confirm single-column layout and 44px minimum tap targets for compact controls |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Validation baseline plan covers all referenced automated test files
- [x] No watch-mode flags
- [x] Feedback latency < 30s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-04-03
