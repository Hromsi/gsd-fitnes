import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GeneratePlanForm } from "@/components/workouts/generate-plan-form";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
  }),
}));

describe("generate plan form", () => {
  it("shows the generation CTA before a plan exists", () => {
    render(
      <GeneratePlanForm
        action={vi.fn(async () => ({ success: false }))}
        hasActivePlan={false}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Generate workout plan" }),
    ).toBeInTheDocument();
  });

  it("hides the generation CTA after an active plan exists", () => {
    render(
      <GeneratePlanForm
        action={vi.fn(async () => ({ success: false }))}
        hasActivePlan
      />,
    );

    expect(
      screen.queryByRole("button", { name: "Generate workout plan" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Your first plan is ready. Next up: view your weekly schedule."),
    ).toBeInTheDocument();
  });
});
