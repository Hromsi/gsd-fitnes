import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { WorkoutDetailModal } from "@/components/workouts/workout-detail-modal";
import type { ActiveWorkoutDay } from "@/lib/workouts/types";

const backMock = vi.fn();
const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    back: backMock,
    push: pushMock,
  }),
}));

function createWorkoutDay(type: "workout" | "rest"): ActiveWorkoutDay {
  return {
    id: "day-1",
    workoutPlanId: "plan-1",
    dayIndex: 0,
    dayLabel: "Day 1",
    type,
    category: type === "workout" ? "upper" : null,
    guidance: type === "workout" ? "4 sets x 8-10 reps" : null,
    createdAt: new Date(),
    updatedAt: new Date(),
    exercises:
      type === "workout"
        ? [
            {
              id: "entry-1",
              workoutDayId: "day-1",
              exerciseId: "exercise-1",
              sortOrder: 0,
              createdAt: new Date(),
              updatedAt: new Date(),
              exercise: {
                id: "exercise-1",
                name: "Push-Up",
                description: "A bodyweight pressing movement.",
                equipment: "none",
                level: "beginner",
                category: "upper",
              },
            },
          ]
        : [],
  };
}

describe("workout detail modal", () => {
  beforeEach(() => {
    backMock.mockClear();
    pushMock.mockClear();
  });

  it("renders workout detail content with descriptions and navigation", () => {
    render(
      <WorkoutDetailModal
        closeHref="/app"
        day={createWorkoutDay("workout")}
        nextHref="/app/day/day-2"
        previousHref="/app/day/day-0"
      />,
    );

    expect(screen.getByText("Push-Up")).toBeInTheDocument();
    expect(screen.getByText("A bodyweight pressing movement.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Previous day" })).toHaveAttribute(
      "href",
      "/app/day/day-0",
    );
    expect(screen.getByRole("link", { name: "Next day" })).toHaveAttribute(
      "href",
      "/app/day/day-2",
    );
  });

  it("closes intercepted modal detail via router.back", () => {
    render(
      <WorkoutDetailModal closeHref="/app" day={createWorkoutDay("workout")} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(backMock).toHaveBeenCalledTimes(1);
  });

  it("closes intercepted modal detail when clicking the overlay", () => {
    render(
      <WorkoutDetailModal closeHref="/app" day={createWorkoutDay("workout")} />,
    );

    fireEvent.click(screen.getByTestId("modal-overlay"));

    expect(backMock).toHaveBeenCalledTimes(1);
  });

  it("renders a lighter rest-day detail state", () => {
    render(
      <WorkoutDetailModal closeHref="/app" day={createWorkoutDay("rest")} />,
    );

    expect(screen.getByText("Recovery day")).toBeInTheDocument();
    expect(
      screen.getByText(/Take this day to recover, move lightly/),
    ).toBeInTheDocument();
  });
});
