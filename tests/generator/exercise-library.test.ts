import { describe, expect, it } from "vitest";
import { groupExercisesByCategory } from "@/lib/workouts/exercise-library";
import { exerciseCategoryValues } from "@/lib/validators/exercise";

describe("exercise library", () => {
  it("covers all approved workout categories", () => {
    expect(exerciseCategoryValues).toEqual([
      "upper",
      "lower",
      "full_body",
      "core",
      "cardio",
    ]);
  });

  it("groups exercises by category with controlled metadata", () => {
    const grouped = groupExercisesByCategory([
      {
        id: "1",
        name: "Push-Up",
        description: "Bodyweight upper exercise",
        equipment: "none",
        level: "beginner",
        category: "upper",
      },
      {
        id: "2",
        name: "Bodyweight Squat",
        description: "Bodyweight lower exercise",
        equipment: "none",
        level: "beginner",
        category: "lower",
      },
    ]);

    expect(grouped.upper).toHaveLength(1);
    expect(grouped.lower).toHaveLength(1);
    expect(grouped.full_body).toHaveLength(0);
    expect(grouped.core).toHaveLength(0);
    expect(grouped.cardio).toHaveLength(0);
  });
});
