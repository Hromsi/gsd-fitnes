import Link from "next/link";
import { SignOutButton } from "@/components/layout/sign-out-button";

type TopNavProps = {
  currentPathLabel: string;
  showProfileSettingsLink?: boolean;
};

export function TopNav({
  currentPathLabel,
  showProfileSettingsLink = false,
}: TopNavProps) {
  return (
    <header className="border-b border-border bg-surface-muted">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-12">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-semibold text-foreground">
            Personalized Workout Planner
          </Link>
          <span className="hidden rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground sm:inline-flex">
            {currentPathLabel}
          </span>
          {showProfileSettingsLink ? (
            <Link
              href="/settings/profile"
              className="hidden text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground sm:inline-flex"
            >
              Profile settings
            </Link>
          ) : null}
        </div>
        <SignOutButton />
      </div>
    </header>
  );
}
