import { beforeEach, describe, expect, it, vi } from "vitest";

const redirectMock = vi.fn((path: string) => {
  throw new Error(`NEXT_REDIRECT:${path}`);
});

const signInMock = vi.fn();
const signOutMock = vi.fn();
const findUniqueMock = vi.fn();
const createMock = vi.fn();

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("next-auth", () => ({
  AuthError: class AuthError extends Error {},
}));

vi.mock("@/lib/auth", () => ({
  signIn: signInMock,
  signOut: signOutMock,
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: findUniqueMock,
      create: createMock,
    },
  },
}));

describe("signup and login actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a new account and redirects signup users to onboarding", async () => {
    const { signupAction } = await import("@/app/(public)/actions/auth");
    findUniqueMock.mockResolvedValueOnce(null);
    createMock.mockResolvedValueOnce({ id: "user_1" });
    signInMock.mockResolvedValueOnce(undefined);

    const formData = new FormData();
    formData.set("email", "new@example.com");
    formData.set("password", "password123");

    await expect(signupAction({ success: false, errors: {} }, formData)).rejects.toThrow(
      "NEXT_REDIRECT:/onboarding?message=Account+created.+Let%27s+set+up+your+plan.",
    );

    expect(createMock).toHaveBeenCalled();
    const createPayload = createMock.mock.calls[0][0];
    expect(createPayload.data.email).toBe("new@example.com");
    expect(createPayload.data.passwordHash).not.toBe("password123");
  });

  it("logs in existing users and redirects incomplete profiles to onboarding", async () => {
    const { loginAction } = await import("@/app/(public)/actions/auth");
    signInMock.mockResolvedValueOnce(undefined);
    findUniqueMock.mockResolvedValueOnce({
      profile: {
        setupCompleted: false,
      },
    });

    const formData = new FormData();
    formData.set("email", "returning@example.com");
    formData.set("password", "password123");

    await expect(loginAction({ success: false, errors: {} }, formData)).rejects.toThrow(
      "NEXT_REDIRECT:/onboarding",
    );

    expect(signInMock).toHaveBeenCalledWith(
      "credentials",
      expect.objectContaining({
        email: "returning@example.com",
        password: "password123",
        redirect: false,
      }),
    );
  });
});
