"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { AuthFormState } from "@/lib/validators/auth";

type AuthFormProps = {
  action: (
    prevState: AuthFormState,
    formData: FormData,
  ) => Promise<AuthFormState>;
  submitLabel: string;
  pendingLabel: string;
};

const initialState: AuthFormState = {
  success: false,
  errors: {},
};

function SubmitButton({
  submitLabel,
  pendingLabel,
}: {
  submitLabel: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
      disabled={pending}
    >
      {pending ? pendingLabel : submitLabel}
    </button>
  );
}

export function AuthForm({
  action,
  submitLabel,
  pendingLabel,
}: AuthFormProps) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-semibold leading-6 text-foreground"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="min-h-11 w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-accent"
        />
        {state.errors.email ? (
          <p className="text-sm leading-6 text-destructive">{state.errors.email}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-semibold leading-6 text-foreground"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="min-h-11 w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-accent"
        />
        {state.errors.password ? (
          <p className="text-sm leading-6 text-destructive">
            {state.errors.password}
          </p>
        ) : null}
      </div>

      {state.errors.form ? (
        <p className="text-sm leading-6 text-destructive">{state.errors.form}</p>
      ) : null}

      <SubmitButton submitLabel={submitLabel} pendingLabel={pendingLabel} />
    </form>
  );
}
