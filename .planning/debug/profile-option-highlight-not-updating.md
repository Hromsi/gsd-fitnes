---
status: investigating
trigger: "Investigate issue: profile-option-highlight-not-updating"
created: 2026-04-03T00:00:00Z
updated: 2026-04-03T00:08:00Z
---

## Current Focus

hypothesis: `ProfileForm` maintains live selection state, but `OptionGroup` neither accepts nor fires the `onValueChange` callback and instead renders uncontrolled radios with `defaultChecked`, so `selectedValue` never updates at click time.
test: Patch `OptionGroup` to accept `onValueChange`, wire radio `checked` to `selectedValue`, and call the callback on change.
expecting: If true, clicking a card will immediately update `liveValues`, rerender `selectedValue`, and move the visual highlight before save.
next_action: implement the controlled radio fix in OptionGroup

## Symptoms

expected: Clicking a profile option in onboarding/settings should immediately update the highlighted selected card before saving.
actual: The saved value updates after submit, but the visual highlight does not change at click time.
errors: No console/runtime error reported. Current implementation uses `selectedValue` for styling in `components/profile/option-group.tsx` while radio inputs use `defaultChecked`.
reproduction: Open `/settings/profile` or onboarding, click another option in a radio-card group, observe that the UI highlight does not move until after save or rerender.
started: Present in current Phase 2 implementation.

## Eliminated

## Evidence

- timestamp: 2026-04-03T00:04:00Z
  checked: components/profile/option-group.tsx
  found: Card styling uses `selectedValue === option.value`, while the underlying radio input uses `defaultChecked={isSelected}`.
  implication: The visual state and the input state can diverge if the parent does not rerender `selectedValue` on click.
- timestamp: 2026-04-03T00:07:00Z
  checked: components/profile/profile-form.tsx
  found: `ProfileForm` already stores local `liveValues` and passes `onValueChange` handlers into each `OptionGroup`, but `OptionGroupProps` does not define or use that prop.
  implication: Clicks do not update local form state, so `selectedValue` remains at the initial/server value and the highlight stays stale until submit or rerender.

## Resolution

root_cause:
fix:
verification:
files_changed: []
