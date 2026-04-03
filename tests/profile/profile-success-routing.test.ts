import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("profile success routing", () => {
  const actionSource = readFileSync(
    path.join(process.cwd(), "app/(app)/actions/profile.ts"),
    "utf8",
  );
  const onboardingSource = readFileSync(
    path.join(process.cwd(), "app/onboarding/page.tsx"),
    "utf8",
  );
  const nextStepSource = readFileSync(
    path.join(process.cwd(), "app/(app)/next-step/page.tsx"),
    "utf8",
  );

  it("marks setup as complete and routes successful onboarding to next-step", () => {
    expect(actionSource).toContain("setupCompleted: true");
    expect(actionSource).toContain('redirectTo: "/next-step"');
    expect(actionSource).toContain("showSuccess: true");
  });

  it("renders the approved success messaging and next-step placeholder", () => {
    expect(onboardingSource).toContain("Let’s build your workout profile.");
    expect(nextStepSource).toContain("Your workout plan is ready to generate.");
    expect(nextStepSource).toContain("Next up: generate your first workout plan.");
  });
});
