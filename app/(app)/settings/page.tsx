import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";

export default function SettingsPage() {
  return (
    <div className="w-full max-w-3xl space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          Settings
        </p>
        <h1 className="text-xl font-semibold leading-tight text-foreground">
          Profile settings
        </h1>
      </div>

      <EmptyState
        title="Profile settings"
        body="Review and update your workout profile before plan generation begins."
      />

      <Link
        href="/settings/profile"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
      >
        Open profile settings
      </Link>
    </div>
  );
}
