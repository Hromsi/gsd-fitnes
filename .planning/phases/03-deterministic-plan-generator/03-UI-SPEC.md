---
phase: 03
slug: deterministic-plan-generator
status: draft
shadcn_initialized: true
preset: new-york
created: 2026-04-04
---

# Phase 03 — UI Design Contract

> Visual and interaction contract for the deterministic plan-generator phase.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | shadcn |
| Preset | new-york |
| Component library | radix via shadcn/ui |
| Icon library | lucide-react |
| Font | Geist |

---

## Design Context

- Phase 3 continues the warm neutral shell from Phases 1 and 2.
- This phase is primarily domain-heavy, so any UI added here should stay minimal and transitional.
- The user should feel like they are moving from “profile setup complete” toward “plan available,” not browsing a full workout schedule yet.
- Mobile responsiveness remains required, but no large new navigation patterns should be introduced.
- Since regenerate UI is deferred, any plan-generation UI in this phase should stay focused on first-generation initiation or simple placeholder/handoff states.

---

## Spacing Scale

Reuse the established spacing system:

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Inline metadata, badges |
| sm | 8px | Tight stack spacing |
| md | 16px | Default spacing |
| lg | 24px | Card padding |
| xl | 32px | Section gaps |
| 2xl | 48px | Major desktop spacing |
| 3xl | 64px | Page-level vertical breathing room |

Exception: 44px minimum touch targets for any action button.

---

## Typography

Continue the Phase 1/2 type system:

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | 16px | 400 | 1.5 |
| Label | 14px | 600 | 1.5 |
| Heading | 20px | 600 | 1.2 |
| Display | 28px | 600 | 1.2 |

Rules:
- Use `28px` only for the main page headline and major empty/success states.
- Use `20px` for section titles and card headings.
- Keep supporting copy short and practical.

---

## Color

Carry forward the same Phase 1/2 token set:

| Role | Value | Usage |
|------|-------|-------|
| Dominant | #F7F4EE | Background and page canvas |
| Secondary | #E6DED0 | Cards and grouped surfaces |
| Accent | #2F6B57 | Primary CTA, selected state, generation-ready emphasis |
| Destructive | #B84A3A | Reserved for sign-out and destructive actions only |

Additional rules:
- Use accent to emphasize “generate plan” readiness or active state only.
- Do not introduce a new color language for plan-generation logic.

---

## Interaction Contract

- Any Phase 3 UI should live inside the authenticated shell.
- The phase may include a minimal “ready to generate” screen or state, but should not yet act like the final schedule experience.
- If a generate action is surfaced for first-plan creation, it should be a single primary action with clear in-button loading text.
- Generated-plan outcomes may be represented as simple confirmation/placeholder states until Phase 4 builds the richer browsing experience.
- No regenerate button is required in this phase.
- No complex filtering, sorting, or admin-like content controls should appear.

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Ready heading | Your workout plan is ready to generate. |
| Primary CTA | Generate workout plan |
| Loading CTA | Generating plan... |
| Empty/body tone | Clear, practical, next-step oriented |
| Generated-state bridge copy | Your first plan is ready. Next up: view your weekly schedule. |

Additional copy rules:
- Avoid implying AI or coach-like behavior.
- Emphasize structure and clarity over motivation-speak.
- Keep generated-state copy transitional because full plan browsing belongs to the next phase.

---

## Component Inventory

- Authenticated page container
- Generation-ready state card
- Primary generation button
- Minimal status badge or plan-state pill
- Transitional success/ready state panel
- Small metadata rows for generated-plan summary if needed

---

## Layout Contract

- Desktop: centered content column with one dominant card surface.
- Mobile: single-column stacked layout with full-width primary action.
- Avoid multi-panel dashboards and avoid introducing the final weekly schedule layout here.
- The primary CTA should remain the focal action on the page.

---

## Checker Sign-Off

- [x] Copywriting aligned with Phase 3 scope
- [x] Visual continuity preserved from earlier phases
- [x] Color usage stays within established tokens
- [x] Typography remains consistent
- [x] Spacing and tap targets remain mobile-safe
- [x] No unsafe registry dependencies introduced

**Approval:** approved 2026-04-04
