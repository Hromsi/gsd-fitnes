import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PublicHomePage from "@/app/(public)/page";

describe("landing page", () => {
  it("shows the workout-planner headline and auth CTAs", () => {
    render(<PublicHomePage />);

    expect(
      screen.getByRole("heading", {
        name: /build a weekly training plan that fits your goals and routine/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create account" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Log in" })).toBeInTheDocument();
  });
});
