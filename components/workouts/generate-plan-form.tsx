"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

type GeneratePlanState = {
  success: boolean;
  error?: string;
  planSummary?: string;
};

type GeneratePlanFormProps = {
  action: (
    prevState: GeneratePlanState,
    formData: FormData,
  ) => Promise<GeneratePlanState>;
  hasActivePlan: boolean;
};

const initialState: GeneratePlanState = {
  success: false,
};

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
      disabled={pending || disabled}
    >
      {pending ? "Generating plan..." : "Generate workout plan"}
    </button>
  );
}

export function GeneratePlanForm({
  action,
  hasActivePlan,
}: GeneratePlanFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (!state.success) {
      return;
    }

    router.refresh();
  }, [router, state.success]);

  return (
    <form action={formAction} className="space-y-4">
      {!hasActivePlan ? <SubmitButton disabled={false} /> : null}
      {state.error ? (
        <p className="text-sm leading-6 text-destructive">{state.error}</p>
      ) : null}
      {state.success && state.planSummary ? (
        <p className="text-sm leading-6 text-muted">{state.planSummary}</p>
      ) : null}
      {hasActivePlan ? (
        <p className="text-sm leading-6 text-muted">
          Your first plan is ready. Next up: view your weekly schedule.
        </p>
      ) : null}
    </form>
  );
}
