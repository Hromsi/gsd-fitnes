import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("auth config", () => {
  const authSource = readFileSync(
    path.join(process.cwd(), "lib/auth.ts"),
    "utf8",
  );
  const routeSource = readFileSync(
    path.join(process.cwd(), "app/api/auth/[...nextauth]/route.ts"),
    "utf8",
  );

  it("uses credentials auth with persistent database sessions", () => {
    expect(authSource).toContain('strategy: "jwt"');
    expect(authSource).toContain("maxAge: 31536000");
    expect(authSource).toContain("Credentials(");
    expect(authSource).toContain("PrismaAdapter");
    expect(authSource).toContain("jwt: async");
    expect(authSource).toContain('signIn: "/login"');
  });

  it("exports route handlers for GET and POST", () => {
    expect(routeSource).toContain("GET");
    expect(routeSource).toContain("POST");
  });
});
