import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { weeklyTemplates } from "@/lib/workouts/templates";

describe("plan persistence contract", () => {
  const savePlanSource = readFileSync(
    path.join(process.cwd(), "lib/workouts/save-generated-plan.ts"),
    "utf8",
  );
  const actionSource = readFileSync(
    path.join(process.cwd(), "app/(app)/actions/generate-plan.ts"),
    "utf8",
  );
  const nextStepSource = readFileSync(
    path.join(process.cwd(), "app/(app)/next-step/page.tsx"),
    "utf8",
  );

  it("keeps only one active plan while allowing historical plans", () => {
    expect(savePlanSource).toContain("tx.workoutPlan.updateMany");
    expect(savePlanSource).toContain("isActive: false");
    expect(savePlanSource).toContain("isActive: true");
    expect(actionSource).toContain("export async function generatePlanAction");
    expect(nextStepSource).toContain("GeneratePlanForm");
  });

  it("preserves seven-day templates for snapshot persistence", () => {
    expect(weeklyTemplates[3]).toHaveLength(7);
    expect(weeklyTemplates[4]).toHaveLength(7);
    expect(weeklyTemplates[5]).toHaveLength(7);
  });
});
