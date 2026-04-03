import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WeeklyPlanView } from "@/components/workouts/weekly-plan-view";
import type { ActiveWorkoutPlan } from "@/lib/workouts/types";

function createPlan(): ActiveWorkoutPlan {
  return {
    id: "plan-1",
    userId: "user-1",
    goal: "build_muscle",
    fitnessLevel: "beginner",
    equipment: "home",
    trainingFrequency: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    workoutDays: Array.from({ length: 7 }, (_, index) => ({
      id: `day-${index}`,
      workoutPlanId: "plan-1",
      dayIndex: index,
      dayLabel: `Day ${index + 1}`,
      type: index === 1 || index === 3 || index === 6 ? "rest" : "workout",
      category: index === 1 || index === 3 || index === 6 ? null : "upper",
      guidance: index === 1 || index === 3 || index === 6 ? null : "4 sets x 8-10 reps",
      createdAt: new Date(),
      updatedAt: new Date(),
      exercises:
        index === 1 || index === 3 || index === 6
          ? []
          : [
              {
                id: `entry-${index}`,
                workoutDayId: `day-${index}`,
                exerciseId: `exercise-${index}`,
                sortOrder: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
                exercise: {
                  id: `exercise-${index}`,
                  name: `Exercise ${index + 1}`,
                  description: "Demo description",
                  equipment: "home",
                  level: "beginner",
                  category: "upper",
                },
              },
            ],
    })),
  };
}

describe("weekly plan view", () => {
  it("renders all seven days with workout and rest states", () => {
    render(<WeeklyPlanView plan={createPlan()} />);

    expect(screen.getByText("Your active 7-day workout plan")).toBeInTheDocument();
    expect(screen.getAllByText(/Day /)).toHaveLength(7);
    expect(screen.getAllByText("Rest day").length).toBeGreaterThan(0);
    expect(screen.getByText("Exercise 1")).toBeInTheDocument();
  });
});
