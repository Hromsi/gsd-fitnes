import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import { EmptyState } from "@/components/ui/empty-state";
import { GeneratePlanForm } from "@/components/workouts/generate-plan-form";
import { generatePlanAction } from "@/app/(app)/actions/generate-plan";
import { getActiveWorkoutPlan } from "@/lib/workouts/get-active-plan";

export default async function NextStepPage() {
  const currentUser = await getCurrentUser();

  const activePlan = currentUser
    ? await getActiveWorkoutPlan(currentUser.id)
    : null;

  if (activePlan) {
    redirect("/app");
  }

  return (
    <div className="w-full max-w-3xl space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          Next step
        </p>
        <h1 className="text-[28px] font-semibold leading-tight text-foreground">
          Your workout plan is ready to generate.
        </h1>
      </div>

      <EmptyState
        title="Next up: generate your first workout plan."
        body="Turn your saved profile into a structured weekly plan with one focused generation step."
      />

      <GeneratePlanForm
        action={generatePlanAction}
        hasActivePlan={false}
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
