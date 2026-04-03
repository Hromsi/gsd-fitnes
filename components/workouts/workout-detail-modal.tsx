import Link from "next/link";
import type { ActiveWorkoutDay } from "@/lib/workouts/types";
import { cn } from "@/lib/utils";
import { ModalCloseButton } from "@/components/workouts/modal-close-button";
import { ModalDismissLayer } from "@/components/workouts/modal-dismiss-layer";

type WorkoutDetailModalProps = {
  day: ActiveWorkoutDay;
  closeHref: string;
  previousHref?: string | null;
  nextHref?: string | null;
  presentation?: "modal" | "page";
};

function formatCategory(category: ActiveWorkoutDay["category"]) {
  if (!category) {
    return "Rest day";
  }

  return category.replaceAll("_", " ");
}

export function WorkoutDetailModal({
  day,
  closeHref,
  previousHref,
  nextHref,
  presentation = "modal",
}: WorkoutDetailModalProps) {
  const isWorkout = day.type === "workout";
  const content = (
    <div
      className="w-full max-w-3xl rounded-[1.75rem] border border-border bg-surface p-6 shadow-[0_24px_60px_rgba(33,53,45,0.16)] sm:p-8"
      role="dialog"
      aria-modal={presentation === "modal"}
    >
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              {day.dayLabel}
            </p>
            <h1 className="text-[30px] font-semibold capitalize leading-tight text-foreground">
              {formatCategory(day.category)}
            </h1>
            {day.guidance ? (
              <p className="text-base leading-6 text-muted">{day.guidance}</p>
            ) : null}
          </div>
          {presentation === "modal" ? (
            <ModalCloseButton closeHref={closeHref} />
          ) : (
            <Link
              href={closeHref}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
            >
              Close
            </Link>
          )}
        </div>

        {isWorkout ? (
          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              Exercises
            </h2>
            <div className="space-y-3">
              {day.exercises.map((entry, index) => (
                <article
                  key={entry.id}
                  className="rounded-[1.25rem] border border-border bg-background px-4 py-4"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-muted">
                      Exercise {index + 1}
                    </p>
                    <h3 className="text-lg font-semibold text-foreground">
                      {entry.exercise.name}
                    </h3>
                    <p className="text-sm leading-6 text-muted">
                      {entry.exercise.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <section className="rounded-[1.25rem] border border-border bg-background px-4 py-4">
            <h2 className="text-lg font-semibold text-foreground">Recovery day</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Take this day to recover, move lightly, and get ready for the next workout in your plan.
            </p>
          </section>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          {previousHref ? (
            <Link
              href={previousHref}
              replace={presentation === "modal"}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
            >
              Previous day
            </Link>
          ) : (
            <span />
          )}

          {nextHref ? (
            <Link
              href={nextHref}
              replace={presentation === "modal"}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90"
            >
              Next day
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );

  if (presentation === "modal") {
    return <ModalDismissLayer>{content}</ModalDismissLayer>;
  }

  return <div className={cn("w-full max-w-3xl")}>{content}</div>;
}
