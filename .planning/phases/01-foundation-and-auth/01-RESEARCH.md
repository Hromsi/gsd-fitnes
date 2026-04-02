# Phase 1 Research: Foundation and Auth

**Phase:** 01 - Foundation and Auth  
**Date:** 2026-04-03  
**Status:** Complete

## Objective

Research the best implementation approach for a brand-new Next.js + TypeScript + Tailwind + PostgreSQL + Prisma app that needs:

- email/password authentication
- persistent sessions
- protected routes
- per-user data isolation
- a minimal public landing page
- a single-profile-per-user foundation for later phases

## Recommended Stack Decisions

### 1. Routing and app structure

- Use **Next.js App Router** for the new app foundation.
- Prefer **server components by default** and only introduce client components for interactive auth forms and local UI state.
- Organize route groups early:
  - `app/(public)` for landing, login, and signup
  - `app/(app)` for authenticated pages
  - `app/api` for auth handlers and server-side endpoints as needed

**Why:** Official Next.js guidance continues to center App Router for new apps, and this project is greenfield.

### 2. Authentication approach

- Use **Auth.js / next-auth v5-style setup** with a Prisma adapter-backed session model.
- Keep auth **email + password only** in Phase 1 even though the adapter supports richer future flows.
- Implement a **Credentials** flow for sign-in and sign-up, with password hashing handled in app code.
- Use **database-backed sessions**, not a custom hand-rolled cookie/session system.

**Why:** Next.js recommends using an authentication library for security and simplicity rather than inventing a custom auth layer. Prisma’s Auth.js guide shows the standard Auth.js + Prisma adapter shape and route protection flow.

### 3. Authorization pattern

- Use **optimistic route checks** for fast redirects on protected routes.
- Back those up with **secure DAL checks** near data access for anything user-specific.
- Centralize auth/session lookups in a small server-side auth/data-access layer instead of scattering session logic across pages.

**Why:** Official Next.js auth guidance recommends a DAL and DTO-style authorization boundary, with proxy-based optimistic checks as an optional fast gate, not the only protection.

### 4. Database and ORM setup

- Use **Prisma with PostgreSQL** and create migrations in Phase 1.
- Create a reusable Prisma client helper early.
- Add a minimal seed path for local development.

**Why:** Prisma’s current Next.js guide still supports the standard greenfield path: create app, initialize Prisma, generate client, migrate, and use a stable shared client.

## Suggested Data Model Shape

### Auth core

Use a user model that supports account ownership cleanly from the start:

- `User`
  - `id`
  - `email` unique
  - `passwordHash`
  - timestamps
- `Session`
  - session token
  - `userId`
  - expiry

### Minimal profile placeholder

Because Phase 1 must prepare for Phase 2, add a separate `Profile` model now with a **1:1 relation** to `User`.

Recommended shape:

- `Profile`
  - `id`
  - `userId` unique
  - timestamps
  - optional placeholder fields only if they help later migration clarity

Keep the relation **optional from the `User` side** so a user can exist before onboarding completes.

**Why:** Prisma’s one-to-one relation docs explicitly support a `User` -> optional `Profile?` model with a unique foreign key on the profile side, which matches the “one profile per user, but not necessarily created at signup” requirement.

## Route and Page Recommendations

### Public routes

- `/` -> minimal landing page with app value proposition and `Log in` / `Sign up` CTAs
- `/login` -> dedicated login page
- `/signup` -> dedicated signup page

### Protected routes

- `/onboarding` -> immediate destination after signup
- `/app` or `/dashboard` -> authenticated home shell, but keep it lightweight in Phase 1

### Redirect rules

- Unauthenticated user visiting protected route -> redirect to `/login`
- Authenticated user without completed setup -> route to `/onboarding`
- Authenticated user visiting `/login` or `/signup` -> optionally redirect away once a protected destination exists

## Session Guidance

- Match the product decision: persistent sessions until explicit sign-out.
- Do not add `Remember me`.
- Allow concurrent sessions on multiple devices.
- Keep sign-out simple and global only for the current session unless future requirements say otherwise.

## Seed and Dev Workflow Recommendations

- Add a seed script that creates:
  - one dev user with a known email/password
  - one optional empty/minimal profile record for testing protected flows
- Keep seed data minimal and deterministic.
- Include the basic local workflow in Phase 1 planning:
  - install deps
  - create `.env`
  - run prisma migrate
  - run prisma db seed
  - start dev server

## Risks and Pitfalls

### 1. Overbuilding auth

The product explicitly defers email verification, forgot-password, roles, and social login. Do not let Auth.js defaults or adapter models pull Phase 1 into those flows.

### 2. Mixing route protection and data protection

Redirect logic alone is not enough. Even with route gating, user-specific queries must still scope by `userId` in server code.

### 3. Coupling onboarding too tightly to auth internals

Phase 1 should prepare for onboarding, not fully implement fitness profile capture. The profile placeholder should stay minimal.

### 4. Public/app shell drift

Since the MVP wants a minimal public experience, avoid building a large marketing site or a heavy dashboard shell too early.

### 5. Custom auth complexity

If the team bypasses a library-backed session flow entirely, planning and execution risk expanding into security-sensitive edge cases. For this phase, the safer path is still a library-backed auth/session baseline.

## Planning Implications for the 3 Roadmap Plans

### 01-01 Scaffold app, Tailwind, database, Prisma

This plan should cover:

- create the Next.js app foundation with TypeScript and Tailwind
- configure Prisma and PostgreSQL connection
- create initial schema for `User`, `Session`, and `Profile`
- add env examples and migration workflow
- add a reusable Prisma client module

### 01-02 Implement auth and protected routing

This plan should cover:

- Auth.js setup and auth route handler wiring
- credentials-based login/sign-up flow
- password hashing and credential validation
- session persistence
- protected-route redirects
- server-side user lookup utilities scoped to current user

### 01-03 App shell, ownership patterns, and seeds

This plan should cover:

- minimal landing page
- separate login and signup pages
- authenticated shell with top nav only
- redirect to onboarding after signup
- minimal seed/dev workflow
- shared ownership/query patterns for future user-scoped data

## Recommended Planning Defaults

- Favor **three focused plans** exactly as the roadmap suggests.
- Keep the app structure and schema extensible, but do not add future-phase features.
- Bake in ownership conventions early:
  - all user-specific tables should point to `userId`
  - all protected reads/writes should resolve current user on the server first

## Sources

- Next.js Authentication Guide: https://nextjs.org/docs/app/guides/authentication
- Prisma + Auth.js + Next.js Guide: https://www.prisma.io/docs/guides/authentication/authjs/nextjs
- Prisma One-to-One Relations: https://www.prisma.io/docs/v6/orm/prisma-schema/data-model/relations/one-to-one-relations
- Prisma Next.js Guide: https://www.prisma.io/docs/guides/frameworks/nextjs
