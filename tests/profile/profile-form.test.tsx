import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProfileForm } from "@/components/profile/profile-form";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

describe("profile form", () => {
  it("renders all fixed onboarding options and save CTA", () => {
    render(
      <ProfileForm
        action={vi.fn()}
        initialValues={{}}
        intent="onboarding"
      />,
    );

    expect(screen.getByText("Lose weight")).toBeInTheDocument();
    expect(screen.getByText("Build muscle")).toBeInTheDocument();
    expect(screen.getByText("Maintain")).toBeInTheDocument();
    expect(screen.getByText("Beginner")).toBeInTheDocument();
    expect(screen.getByText("Intermediate")).toBeInTheDocument();
    expect(screen.getByText("No equipment")).toBeInTheDocument();
    expect(screen.getByText("Home setup")).toBeInTheDocument();
    expect(screen.getByText("Gym access")).toBeInTheDocument();
    expect(screen.getByText("3 days per week")).toBeInTheDocument();
    expect(screen.getByText("4 days per week")).toBeInTheDocument();
    expect(screen.getByText("5 days per week")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save profile" })).toBeInTheDocument();
  });

  it("prefills saved values in settings mode", () => {
    render(
      <ProfileForm
        action={vi.fn()}
        initialValues={{
          goal: "build_muscle",
          fitnessLevel: "intermediate",
          equipment: "gym",
          trainingFrequency: "4",
        }}
        intent="settings"
      />,
    );

    expect(screen.getByDisplayValue("build_muscle")).toBeChecked();
    expect(screen.getByDisplayValue("intermediate")).toBeChecked();
    expect(screen.getByDisplayValue("gym")).toBeChecked();
    expect(screen.getByDisplayValue("4")).toBeChecked();
    expect(screen.getByRole("button", { name: "Update profile" })).toBeInTheDocument();
  });
});
