# Phase 4 UI Design Contract

**Phase:** 04-weekly-plan-experience  
**Date:** 2026-04-04  
**Status:** Approved

## Intent

Turn the app from a post-onboarding transition into a usable workout-planning surface. The interface should feel like a calm, readable weekly planner rather than a dense fitness dashboard.

## Layout Contract

- `App` becomes the main entry into the weekly plan experience.
- The weekly schedule is presented as a seven-card sequence inside the existing authenticated shell.
- Cards should stack cleanly on mobile and feel comfortably browseable on desktop.
- Today’s card receives a stronger highlight treatment than other days.
- Rest-day cards remain present but use a quieter visual style than workout days.

## Card Content Contract

- Every card shows the day label.
- Workout cards show workout type and a short preview of exercises.
- Rest-day cards show a short plain-language rest/recovery label.
- Cards should communicate clickability/tappability clearly without needing heavy chrome.

## Detail Contract

- Workout detail opens as a route-driven modal over the weekly page.
- The modal includes:
  - day label
  - workout type
  - short guidance
  - ordered exercise list
  - text descriptions
- Rest days use a simplified modal state instead of a full workout treatment.
- Detail UI must include a clear close/back affordance plus next/previous day navigation.

## Regenerate Contract

- Regenerate entry belongs in `Profile settings`.
- It should not dominate the screen.
- Confirmation must feel explicit but lightweight.
- After regenerate succeeds, the user should land back in the weekly experience with refreshed active-plan content.

## Empty and Fallback States

- Users without an active plan should not see a fake weekly schedule.
- `next-step` remains the fallback screen only for that no-plan state.
- If a detail route points to a non-current or unauthorized plan/day, the experience should redirect or fail cleanly instead of exposing stale content.

## Visual Tone

- Preserve the warm neutral palette and quiet confidence of earlier phases.
- Avoid over-design: no fake analytics, charts, or “coach” styling.
- Weekly cards should feel structured and helpful, with just enough contrast to separate workout and rest days.
- Modal detail should feel like a focused extension of the planner, not a separate product area.

## Responsive Expectations

- Weekly cards remain single-column and readable on phone widths.
- Tap targets should remain generous.
- Modal detail should be usable on mobile without overflow traps or clipped navigation.

## Approval Notes

- This phase intentionally keeps the schedule surface simple so Phase 5 can add completion state without large UI rework.
- `shadcn` remains the approved primitive baseline if a dialog/modal primitive is needed.

---

**Approved:** 2026-04-04
