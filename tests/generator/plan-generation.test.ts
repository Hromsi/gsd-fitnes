import { beforeEach, describe, expect, it, vi } from "vitest";

const getExercisesForGeneratorMock = vi.fn();

vi.mock("@/lib/workouts/exercise-library", () => ({
  getExercisesForGenerator: getExercisesForGeneratorMock,
}));

describe("plan generation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getExercisesForGeneratorMock.mockImplementation(async ({ category }) => {
      return Array.from({ length: 6 }, (_, index) => ({
        id: `${category}-${index}`,
        name: `${category}-${index}`,
        description: "exercise",
        equipment: "home",
        level: "beginner",
        category,
      }));
    });
  });

  it("creates a seven-day plan with workout and rest days based on frequency", async () => {
    const { generateWorkoutPlan } = await import("@/lib/workouts/generate-plan");
    const plan = await generateWorkoutPlan({
      goal: "build_muscle",
      fitnessLevel: "beginner",
      equipment: "home",
      trainingFrequency: 3,
    });

    expect(plan.days).toHaveLength(7);
    expect(plan.days.filter((day) => day.type === "workout")).toHaveLength(3);
    expect(plan.days.filter((day) => day.type === "rest")).toHaveLength(4);
  });

  it("changes workout-day count when training frequency changes", async () => {
    const { generateWorkoutPlan } = await import("@/lib/workouts/generate-plan");
    const plan = await generateWorkoutPlan({
      goal: "maintain",
      fitnessLevel: "intermediate",
      equipment: "gym",
      trainingFrequency: 5,
    });

    expect(plan.days.filter((day) => day.type === "workout")).toHaveLength(5);
    expect(plan.days.every((day) => day.dayLabel.startsWith("Day"))).toBe(true);
  });

  it("adjusts workout guidance based on goal", async () => {
    const { generateWorkoutPlan } = await import("@/lib/workouts/generate-plan");
    const buildMusclePlan = await generateWorkoutPlan({
      goal: "build_muscle",
      fitnessLevel: "beginner",
      equipment: "home",
      trainingFrequency: 3,
    });
    const loseWeightPlan = await generateWorkoutPlan({
      goal: "lose_weight",
      fitnessLevel: "beginner",
      equipment: "home",
      trainingFrequency: 3,
    });

    expect(
      buildMusclePlan.days.find((day) => day.type === "workout")?.guidance,
    ).toContain("4 sets");
    expect(
      loseWeightPlan.days.find((day) => day.type === "workout")?.guidance,
    ).toContain("3 sets");
  });
});
