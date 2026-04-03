import Link from "next/link";
import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
import { EmptyState } from "@/components/ui/empty-state";
import { GeneratePlanForm } from "@/components/workouts/generate-plan-form";
import { generatePlanAction } from "@/app/(app)/actions/generate-plan";

export default async function NextStepPage() {
  const currentUser = await getCurrentUser();

  const activePlan = currentUser
    ? await prisma.workoutPlan.findFirst({
        where: {
          userId: currentUser.id,
          isActive: true,
        },
        include: {
          workoutDays: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : null;

  return (
    <div className="w-full max-w-3xl space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          Next step
        </p>
        <h1 className="text-[28px] font-semibold leading-tight text-foreground">
          {activePlan
            ? "Your first plan is ready."
            : "Your workout plan is ready to generate."}
        </h1>
      </div>

      <EmptyState
        title={
          activePlan
            ? "Your first plan is ready. Next up: view your weekly schedule."
            : "Next up: generate your first workout plan."
        }
        body={
          activePlan
            ? `Current active plan: ${activePlan.workoutDays.filter((day) => day.type === "workout").length} workout days in a 7-day cycle.`
            : "Turn your saved profile into a structured weekly plan with one focused generation step."
        }
      />

      <GeneratePlanForm
        action={generatePlanAction}
        hasActivePlan={Boolean(activePlan)}
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
