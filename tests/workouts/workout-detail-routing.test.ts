import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("workout detail routing", () => {
  const helperSource = readFileSync(
    path.join(process.cwd(), "lib/workouts/get-active-plan-day.ts"),
    "utf8",
  );
  const modalRouteSource = readFileSync(
    path.join(process.cwd(), "app/(app)/app/@modal/(.)day/[dayId]/page.tsx"),
    "utf8",
  );
  const modalComponentSource = readFileSync(
    path.join(process.cwd(), "components/workouts/workout-detail-modal.tsx"),
    "utf8",
  );

  it("restricts detail resolution to the active plan", () => {
    expect(helperSource).toContain("getActiveWorkoutPlan");
    expect(helperSource).toContain("notFound()");
    expect(modalRouteSource).toContain("getActivePlanDay");
  });

  it("replaces modal day navigation instead of stacking history entries", () => {
    expect(modalComponentSource).toContain('replace={presentation === "modal"}');
  });
});
