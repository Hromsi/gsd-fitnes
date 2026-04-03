import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    replace,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    replace?: boolean;
  }) => {
    void replace;

    return (
      React.createElement("a", { href, ...props }, children)
    );
  },
}));
