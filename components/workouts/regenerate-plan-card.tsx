"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

type GeneratePlanState = {
  success: boolean;
  error?: string;
  planSummary?: string;
  redirectTo?: string;
};

type RegeneratePlanCardProps = {
  action: (
    prevState: GeneratePlanState,
    formData: FormData,
  ) => Promise<GeneratePlanState>;
  workoutDayCount: number;
};

const initialState: GeneratePlanState = {
  success: false,
};

function ConfirmButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
      disabled={pending}
    >
      {pending ? "Regenerating plan..." : "Confirm regenerate"}
    </button>
  );
}

export function RegeneratePlanCard({
  action,
  workoutDayCount,
}: RegeneratePlanCardProps) {
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (!state.success) {
      return;
    }

    router.push(state.redirectTo ?? "/app");
    router.refresh();
  }, [router, state.redirectTo, state.success]);

  return (
    <section className="space-y-4 rounded-[1.5rem] border border-border bg-background px-5 py-5">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
          Regenerate
        </p>
        <h2 className="text-xl font-semibold leading-tight text-foreground">
          Replace your current active plan
        </h2>
        <p className="text-sm leading-6 text-muted">
          Your current plan has {workoutDayCount} workout days. Regenerating keeps the old snapshot in history but makes the new plan active.
        </p>
      </div>

      {!isConfirming ? (
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
          onClick={() => setIsConfirming(true)}
        >
          Regenerate plan
        </button>
      ) : (
        <form action={formAction} className="space-y-3">
          <input name="redirectTo" type="hidden" value="/app" />
          <p className="text-sm leading-6 text-muted">
            Confirm to generate a new active plan from your current profile settings.
          </p>
          <div className="flex flex-wrap gap-3">
            <ConfirmButton />
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
              onClick={() => setIsConfirming(false)}
            >
              Cancel
            </button>
          </div>
          {state.error ? (
            <p className="text-sm leading-6 text-destructive">{state.error}</p>
          ) : null}
        </form>
      )}
    </section>
  );
}
