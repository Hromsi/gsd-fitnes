import Link from "next/link";
import type { ActiveWorkoutDay } from "@/lib/workouts/types";
import { cn } from "@/lib/utils";

type PlanDayCardProps = {
  day: ActiveWorkoutDay;
  isToday: boolean;
};

function formatCategory(category: ActiveWorkoutDay["category"]) {
  if (!category) {
    return "Rest day";
  }

  return category.replaceAll("_", " ");
}

export function PlanDayCard({ day, isToday }: PlanDayCardProps) {
  const previewExercises = day.exercises
    .slice(0, 3)
    .map((entry) => entry.exercise.name)
    .join(" • ");

  return (
    <Link
      href={`/app/day/${day.id}`}
      className={cn(
        "block rounded-[1.5rem] border px-5 py-5 transition-colors hover:border-accent/60 hover:bg-surface",
        day.type === "workout"
          ? "border-border bg-surface shadow-[0_18px_40px_rgba(33,53,45,0.06)]"
          : "border-border/80 bg-surface-muted/40",
        isToday && "border-accent bg-surface shadow-[0_18px_40px_rgba(47,107,87,0.12)]",
      )}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              {day.dayLabel}
            </p>
            <h2 className="text-xl font-semibold capitalize text-foreground">
              {formatCategory(day.category)}
            </h2>
          </div>
          {isToday ? (
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground">
              Today
            </span>
          ) : null}
        </div>

        {day.type === "workout" ? (
          <div className="space-y-2">
            <p className="text-sm leading-6 text-muted">{day.guidance}</p>
            <p className="text-sm leading-6 text-foreground/80">
              {previewExercises}
            </p>
          </div>
        ) : (
          <p className="text-sm leading-6 text-muted">
            Recovery and reset. Open to view your rest-day guidance.
          </p>
        )}
      </div>
    </Link>
  );
}
