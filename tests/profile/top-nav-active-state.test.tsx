import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TopNav } from "@/components/layout/top-nav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/settings/profile",
}));

vi.mock("@/components/layout/sign-out-button", () => ({
  SignOutButton: () => <button type="button">Sign out</button>,
}));

describe("top nav active state", () => {
  it("highlights the current navigation item instead of the generic app label", () => {
    render(
      <TopNav
        items={[
          { href: "/app", label: "App" },
          { href: "/settings/profile", label: "Profile settings" },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "App" })).not.toHaveClass("bg-accent");
    expect(screen.getByRole("link", { name: "Profile settings" })).toHaveClass(
      "bg-accent",
    );
  });
});
