import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth", () => ({
  auth: (handler: unknown) => handler,
}));

const { resolveProtectedRoute } = await import("@/middleware");

describe("session routing", () => {
  it("redirects unauthenticated users to /login", () => {
    expect(resolveProtectedRoute("/app")).toBe("/login");
  });

  it("redirects incomplete users to /onboarding", () => {
    expect(
      resolveProtectedRoute("/app", {
        user: {
          id: "user_1",
          email: "demo@example.com",
          setupCompleted: false,
        },
      } as never),
    ).toBe("/onboarding");
  });

  it("redirects authenticated users away from auth pages", () => {
    expect(
      resolveProtectedRoute("/login", {
        user: {
          id: "user_1",
          email: "demo@example.com",
          setupCompleted: true,
        },
      } as never),
    ).toBe("/app");
  });
});
