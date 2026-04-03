import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SignupPage from "@/app/(public)/signup/page";
import PublicHomePage from "@/app/(public)/page";

vi.mock("@/app/(public)/actions/auth", () => ({
  signupAction: vi.fn(),
}));

describe("responsive shell", () => {
  it("keeps the primary CTA tappable on the landing page", () => {
    render(<PublicHomePage />);

    expect(screen.getByRole("link", { name: "Create account" })).toHaveClass(
      "min-h-11",
    );
  });

  it("keeps auth actions single-column and tappable", () => {
    render(<SignupPage />);

    expect(screen.getByRole("button", { name: "Create account" })).toHaveClass(
      "min-h-11",
    );
  });
});
