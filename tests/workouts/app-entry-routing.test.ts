import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("app entry routing", () => {
  const appPageSource = readFileSync(
    path.join(process.cwd(), "app/(app)/app/page.tsx"),
    "utf8",
  );
  const settingsSource = readFileSync(
    path.join(process.cwd(), "app/(app)/settings/profile/page.tsx"),
    "utf8",
  );
  const actionSource = readFileSync(
    path.join(process.cwd(), "app/(app)/actions/generate-plan.ts"),
    "utf8",
  );

  it("keeps app focused on the active plan and settings as the regenerate entry", () => {
    expect(appPageSource).toContain("WeeklyPlanView");
    expect(appPageSource).toContain('redirect("/next-step")');
    expect(settingsSource).toContain("RegeneratePlanCard");
    expect(actionSource).toContain(': "/app"');
  });
});
