import { describe, expect, it } from "vitest";
import { getWeeklyTemplate, weeklyTemplates } from "@/lib/workouts/templates";

describe("plan templates", () => {
  it("always span seven days", () => {
    for (const template of Object.values(weeklyTemplates)) {
      expect(template).toHaveLength(7);
    }
  });

  it("preserve explicit rest days", () => {
    const template = getWeeklyTemplate(3);

    expect(template.some((day) => day.type === "rest")).toBe(true);
    expect(template[0].type).toBe("workout");
  });
});
