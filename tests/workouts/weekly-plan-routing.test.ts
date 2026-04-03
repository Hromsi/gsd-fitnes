import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("weekly plan routing", () => {
  const appPageSource = readFileSync(
    path.join(process.cwd(), "app/(app)/app/page.tsx"),
    "utf8",
  );
  const nextStepSource = readFileSync(
    path.join(process.cwd(), "app/(app)/next-step/page.tsx"),
    "utf8",
  );

  it("routes app to next-step only when no active plan exists", () => {
    expect(appPageSource).toContain('redirect("/next-step")');
    expect(appPageSource).toContain("getActiveWorkoutPlan");
    expect(nextStepSource).toContain('redirect("/app")');
  });
});
