import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TopNav } from "@/components/layout/top-nav";
import { EmptyState } from "@/components/ui/empty-state";

vi.mock("@/components/layout/sign-out-button", () => ({
  SignOutButton: () => <button type="button">Sign out</button>,
}));

describe("onboarding shell", () => {
  it("renders the top nav with sign-out access", () => {
    render(<TopNav currentPathLabel="Onboarding" />);

    expect(screen.getByText("Personalized Workout Planner")).toBeInTheDocument();
    expect(screen.getByText("Onboarding")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign out" })).toBeInTheDocument();
  });

  it("renders the onboarding empty state placeholder", () => {
    render(
      <EmptyState
        title="Profile setup is next"
        body="Phase 2 will collect your goal, fitness level, equipment, and training frequency here."
      />,
    );

    expect(screen.getByText("Profile setup is next")).toBeInTheDocument();
  });
});
