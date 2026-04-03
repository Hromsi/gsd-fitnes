import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";

export default function NextStepPage() {
  return (
    <div className="w-full max-w-3xl space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          Next step
        </p>
        <h1 className="text-[28px] font-semibold leading-tight text-foreground">
          Your profile is ready.
        </h1>
      </div>

      <EmptyState
        title="Next up: generate your first workout plan."
        body="Phase 3 will turn this profile into a deterministic weekly workout plan."
      />

      <Link
        href="/settings/profile"
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
      >
        Profile settings
      </Link>
    </div>
  );
}
