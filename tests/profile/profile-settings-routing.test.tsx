import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TopNav } from "@/components/layout/top-nav";

vi.mock("@/components/layout/sign-out-button", () => ({
  SignOutButton: () => <button type="button">Sign out</button>,
}));

describe("profile settings routing", () => {
  it("shows a profile settings entry in the authenticated shell", () => {
    render(<TopNav currentPathLabel="App" showProfileSettingsLink />);

    expect(
      screen.getByRole("link", { name: "Profile settings" }),
    ).toHaveAttribute("href", "/settings/profile");
  });
});
