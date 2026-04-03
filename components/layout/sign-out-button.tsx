"use client";

import { useTransition } from "react";
import { signOutAction } from "@/app/(public)/actions/auth";

export function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
      onClick={() => {
        const confirmed = window.confirm(
          "Sign out: Are you sure you want to sign out?",
        );

        if (!confirmed) {
          return;
        }

        startTransition(async () => {
          await signOutAction();
        });
      }}
      disabled={isPending}
    >
      {isPending ? "Signing out..." : "Sign out"}
    </button>
  );
}
