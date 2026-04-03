import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";

export default function PublicHomePage() {
  return (
    <PageShell>
      <section className="w-full max-w-5xl rounded-[2rem] border border-border bg-surface shadow-[0_30px_80px_rgba(33,53,45,0.08)]">
        <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-14 lg:py-14">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex min-h-11 items-center rounded-full border border-border bg-surface-muted px-4 py-2 text-sm font-semibold text-muted">
                Personalized Workout Planner
              </span>
              <h1 className="max-w-2xl text-[28px] font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                Build a weekly training plan that fits your goals and routine.
              </h1>
              <p className="max-w-xl text-base leading-6 text-muted">
                Create a profile, answer a few fitness questions, and get a
                simple 7-day workout plan tailored to your goal, level,
                equipment, and training frequency.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
              >
                Create account
              </Link>
              <Link
                href="/login"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
              >
                Log in
              </Link>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border bg-surface-muted p-6">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                What you get
              </p>
              <div className="space-y-3 text-base leading-6 text-foreground">
                <p>A focused onboarding flow for your fitness profile.</p>
                <p>A deterministic 7-day plan generated from fixed templates.</p>
                <p>Progress tracking that stays simple enough to keep using.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
