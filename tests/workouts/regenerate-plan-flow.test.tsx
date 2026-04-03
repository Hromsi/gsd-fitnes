import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RegeneratePlanCard } from "@/components/workouts/regenerate-plan-card";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

describe("regenerate plan flow", () => {
  it("requires an explicit confirmation step", () => {
    render(
      <RegeneratePlanCard
        action={vi.fn(async () => ({ success: false }))}
        workoutDayCount={3}
      />,
    );

    expect(screen.getByRole("button", { name: "Regenerate plan" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Regenerate plan" }));

    expect(
      screen.getByRole("button", { name: "Confirm regenerate" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });
});
