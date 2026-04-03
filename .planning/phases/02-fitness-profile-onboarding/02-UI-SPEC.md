---
phase: 02
slug: fitness-profile-onboarding
status: draft
shadcn_initialized: true
preset: new-york
created: 2026-04-03
---

# Phase 02 — UI Design Contract

> Visual and interaction contract for the fitness-profile onboarding phase.

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

- Phase 2 must inherit the Phase 1 warm neutral palette and minimal top-nav shell.
- Onboarding is a single page with one simple form and one submit action.
- The form should work for both first-time completion and later edits.
- Mobile responsiveness is required, but the UI should remain intentionally MVP-simple.
- Completion should feel encouraging, with a short success state before moving to the next placeholder screen.

---

## Spacing Scale

Use the same spacing system established in Phase 1:

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Helper gaps, inline badges |
| sm | 8px | Field option spacing |
| md | 16px | Default form spacing |
| lg | 24px | Section/card padding |
| xl | 32px | Large card gaps |
| 2xl | 48px | Desktop section spacing |
| 3xl | 64px | Page-level vertical breathing room |

Exception: 44px minimum touch targets for selectable options and buttons.

---

## Typography

Continue the Phase 1 type system:

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | 16px | 400 | 1.5 |
| Label | 14px | 600 | 1.5 |
| Heading | 20px | 600 | 1.2 |
| Display | 28px | 600 | 1.2 |

Rules:
- Use `28px` only for the onboarding page heading and success-state headline.
- Use `20px` for section titles, card headings, and settings-page headings.
- Keep helper copy minimal and secondary.

---

## Color

Carry forward the Phase 1 token set unchanged:

| Role | Value | Usage |
|------|-------|-------|
| Dominant | #F7F4EE | App background and main canvas |
| Secondary | #E6DED0 | Cards, grouped field surfaces, top nav |
| Accent | #2F6B57 | Selected states, primary CTA, focus rings, success emphasis |
| Destructive | #B84A3A | Reserved for sign-out and destructive alerts only |

Additional rules:
- Use accent to show the currently selected option in radio-card groups.
- Do not use destructive styling anywhere in the onboarding happy path.

---

## Interaction Contract

- Onboarding is rendered as one page inside the authenticated top-nav shell.
- The form contains exactly four required fields: goal, fitness level, equipment, and training frequency.
- Each field uses constrained selection controls, not free text.
- Validation appears inline on submit.
- The page has one primary action to save the profile.
- First-time completion shows a short success state before routing to the Phase 2 completion placeholder.
- Returning users may revisit the onboarding data in edit mode through a dedicated profile/settings route.
- Edit mode should load saved values into the same form structure rather than a separate wizard or modal.

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Onboarding heading | Let’s build your workout profile. |
| Save CTA | Save profile |
| Saving CTA | Saving profile... |
| Success heading | Your profile is ready. |
| Success body | Next up: generate your first workout plan. |
| Edit entry label | Profile settings |
| Validation tone | Clear, direct, and short |

Additional copy rules:
- Keep labels practical and non-technical.
- Avoid long educational blurbs under fields.
- Success copy should feel transitional, not celebratory marketing.

---

## Component Inventory

- Authenticated onboarding page container
- Single-page onboarding form card
- Radio-card or segmented option groups for each field
- Inline validation messages
- Primary save button
- Short success state panel
- Profile/settings entry point for later edits
- Reusable section heading/subcopy block

---

## Layout Contract

- Desktop: centered content column, comfortable max width, one main card surface.
- Mobile: single-column stacked layout with full-width controls.
- Field groups should scan top-to-bottom without nested sub-sections.
- The primary action stays near the end of the form and remains visually dominant.
- Success state can replace or overlay the form briefly, but should remain on the same visual canvas.

---

## Checker Sign-Off

- [x] Copywriting aligned with Phase 2 scope
- [x] Visual continuity preserved from Phase 1
- [x] Color usage stays within established tokens
- [x] Typography remains consistent
- [x] Spacing and tap targets remain mobile-safe
- [x] No unsafe registry dependencies introduced

**Approval:** approved 2026-04-03
