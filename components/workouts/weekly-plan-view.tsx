import type { ActiveWorkoutPlan } from "@/lib/workouts/types";
import { PlanDayCard } from "@/components/workouts/plan-day-card";

type WeeklyPlanViewProps = {
  plan: ActiveWorkoutPlan;
};

function getTodayDayIndex() {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

export function WeeklyPlanView({ plan }: WeeklyPlanViewProps) {
  const todayDayIndex = getTodayDayIndex();

  return (
    <div className="w-full max-w-5xl space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          Weekly plan
        </p>
        <div className="space-y-2">
          <h1 className="text-[32px] font-semibold leading-tight text-foreground">
            Your active 7-day workout plan
          </h1>
          <p className="text-base leading-6 text-muted">
            {plan.trainingFrequency} workout days, {plan.workoutDays.filter((day) => day.type === "rest").length} rest days, built from your current profile.
          </p>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {plan.workoutDays.map((day) => (
          <PlanDayCard
            key={day.id}
            day={day}
            isToday={day.dayIndex === todayDayIndex}
          />
        ))}
      </section>
    </div>
  );
}
