# Phase 1: Foundation and Auth - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-03
**Phase:** 1-Foundation and Auth
**Areas discussed:** Auth product flow, Session behavior, Initial app shell, Data foundation

---

## Auth Product Flow

| Option | Description | Selected |
|--------|-------------|----------|
| Separate pages | Distinct signup and login screens | ✓ |
| Single page with tabs/toggle | One auth surface with mode switching | |
| You decide | Leave the choice to the agent | |

**User's choice:** Separate pages
**Notes:** User wants separate signup and login pages.

| Option | Description | Selected |
|--------|-------------|----------|
| Required before using app | Gate product access on verified email | |
| Skipped for MVP | Allow use immediately after signup | ✓ |
| You decide | Leave the choice to the agent | |

**User's choice:** Skip email verification in Phase 1
**Notes:** User prefers lower-friction MVP auth.

| Option | Description | Selected |
|--------|-------------|----------|
| Include forgot password | Add password recovery in this phase | |
| Defer to later | Basic auth only for now | ✓ |
| You decide | Leave the choice to the agent | |

**User's choice:** Defer forgot-password flow
**Notes:** User does not want password recovery in Phase 1.

| Option | Description | Selected |
|--------|-------------|----------|
| Go straight into onboarding | Move directly into setup after signup | ✓ |
| Land on a dashboard first | Show a post-signup home screen before setup | |
| You decide | Leave the choice to the agent | |

**User's choice:** Go straight into onboarding/profile setup
**Notes:** Signup should transition directly into setup.

---

## Session Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Persist until sign out | Long-lived session by default | ✓ |
| Expire fairly quickly | Force more frequent login | |
| You decide | Leave the choice to the agent | |

**User's choice:** Persist until manual sign-out
**Notes:** MVP should feel simple and persistent.

| Option | Description | Selected |
|--------|-------------|----------|
| Yes | Include a Remember me checkbox | |
| No | Omit Remember me from Phase 1 | ✓ |
| You decide | Leave the choice to the agent | |

**User's choice:** No Remember me option
**Notes:** Keep the auth form simple.

| Option | Description | Selected |
|--------|-------------|----------|
| Allow multiple sessions | Same user can stay logged in on multiple devices | ✓ |
| One active session only | New login invalidates older sessions | |
| You decide | Leave the choice to the agent | |

**User's choice:** Allow multiple sessions
**Notes:** No special multi-device controls needed in MVP.

| Option | Description | Selected |
|--------|-------------|----------|
| Redirect to login | Send unauthenticated users directly to auth | ✓ |
| Access-required screen | Show an intermediate gate screen | |
| You decide | Leave the choice to the agent | |

**User's choice:** Redirect to login
**Notes:** Protected pages should route straight to login.

---

## Initial App Shell

| Option | Description | Selected |
|--------|-------------|----------|
| Simple landing page | Minimal value prop and auth entry actions | ✓ |
| Go straight to login | No public landing page | |
| You decide | Leave the choice to the agent | |

**User's choice:** Simple landing page
**Notes:** Public entry should be functional and minimal.

| Option | Description | Selected |
|--------|-------------|----------|
| Onboarding/profile setup | Main destination before any workout plan exists | ✓ |
| Simple dashboard prompt | Dashboard first, then setup prompt | |
| You decide | Leave the choice to the agent | |

**User's choice:** Route to onboarding/profile setup
**Notes:** Logged-in users without setup should go directly into setup.

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal top nav only | Keep navigation simple in MVP | ✓ |
| Sidebar on desktop | Heavier app-shell pattern | |
| You decide | Leave the choice to the agent | |

**User's choice:** Minimal top navigation
**Notes:** User wants the lightest practical shell.

| Option | Description | Selected |
|--------|-------------|----------|
| No polished marketing homepage | Functional only | ✓ |
| Yes, include marketing homepage | Build stronger public site now | |
| You decide | Leave the choice to the agent | |

**User's choice:** No polished marketing homepage
**Notes:** Product functionality matters more than marketing polish.

---

## Data Foundation

| Option | Description | Selected |
|--------|-------------|----------|
| Auth plus minimum profile placeholder | Prepare for later phases without overbuilding | ✓ |
| Auth tables only | Add profile later | |
| You decide | Leave the choice to the agent | |

**User's choice:** Auth plus minimum profile placeholder
**Notes:** Phase 1 should lay just enough schema groundwork for Phase 2.

| Option | Description | Selected |
|--------|-------------|----------|
| One profile per user | MVP keeps a single profile model | ✓ |
| Multiple profiles/programs | Add flexibility now | |
| You decide | Leave the choice to the agent | |

**User's choice:** One profile per user
**Notes:** MVP should stay simple and single-profile.

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal dev seed data | Support auth and future profile flow development | ✓ |
| No seeds | Keep Phase 1 schema-only | |
| You decide | Leave the choice to the agent | |

**User's choice:** Include minimal dev seed data
**Notes:** Seed only what helps local development.

| Option | Description | Selected |
|--------|-------------|----------|
| Include simple user role now | Add a role field immediately | |
| No role support | All accounts are normal users in MVP | ✓ |
| You decide | Leave the choice to the agent | |

**User's choice:** No role support
**Notes:** No admin or role complexity in the MVP foundation.

---

## the agent's Discretion

- Exact auth library and session implementation
- Exact minimal profile placeholder schema
- Exact public landing-page copy and layout details

## Deferred Ideas

- Forgot-password flow
- Email verification
- Role support beyond normal user accounts
