"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import {
  emptyProfileFormState,
  equipmentOptions,
  fitnessLevelOptions,
  goalOptions,
  trainingFrequencyOptions,
  type ProfileFormState,
  type ProfileFormValues,
} from "@/lib/validators/profile";
import { OptionGroup } from "@/components/profile/option-group";

type SaveProfileAction = (
  prevState: ProfileFormState,
  formData: FormData,
) => Promise<ProfileFormState>;

type ProfileFormProps = {
  action: SaveProfileAction;
  initialValues: Partial<ProfileFormValues>;
  intent: "onboarding" | "settings";
};

function SubmitButton({ intent }: { intent: "onboarding" | "settings" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
      disabled={pending}
    >
      {pending ? "Saving profile..." : intent === "onboarding" ? "Save profile" : "Update profile"}
    </button>
  );
}

export function ProfileForm({
  action,
  initialValues,
  intent,
}: ProfileFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(action, {
    ...emptyProfileFormState,
    values: initialValues,
  });

  const [liveValues, setLiveValues] = useState<Partial<ProfileFormValues>>(
    initialValues,
  );

  useEffect(() => {
    if (!state.showSuccess || !state.redirectTo) {
      return;
    }

    const timer = window.setTimeout(() => {
      router.push(state.redirectTo!);
      router.refresh();
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [router, state.redirectTo, state.showSuccess]);

  if (state.showSuccess) {
    return (
      <section className="rounded-[1.75rem] border border-border bg-surface px-6 py-8 shadow-[0_24px_60px_rgba(33,53,45,0.08)] sm:px-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            Profile saved
          </p>
          <h2 className="text-[28px] font-semibold leading-tight text-foreground">
            Your profile is ready.
          </h2>
          <p className="text-base leading-6 text-muted">
            Next up: generate your first workout plan.
          </p>
        </div>
      </section>
    );
  }

  const values = liveValues;

  return (
    <form action={formAction} className="space-y-6">
      <input name="intent" type="hidden" value={intent} />

      <OptionGroup
        error={state.errors.goal}
        label="Primary goal"
        name="goal"
        options={goalOptions}
        selectedValue={values.goal}
        onValueChange={(value) =>
          setLiveValues((current) => ({
            ...current,
            goal: value as ProfileFormValues["goal"],
          }))
        }
      />

      <OptionGroup
        error={state.errors.fitnessLevel}
        label="Fitness level"
        name="fitnessLevel"
        options={fitnessLevelOptions}
        selectedValue={values.fitnessLevel}
        onValueChange={(value) =>
          setLiveValues((current) => ({
            ...current,
            fitnessLevel: value as ProfileFormValues["fitnessLevel"],
          }))
        }
      />

      <OptionGroup
        error={state.errors.equipment}
        label="Available equipment"
        name="equipment"
        options={equipmentOptions}
        selectedValue={values.equipment}
        onValueChange={(value) =>
          setLiveValues((current) => ({
            ...current,
            equipment: value as ProfileFormValues["equipment"],
          }))
        }
      />

      <OptionGroup
        error={state.errors.trainingFrequency}
        label="Training frequency"
        name="trainingFrequency"
        options={trainingFrequencyOptions}
        selectedValue={values.trainingFrequency}
        onValueChange={(value) =>
          setLiveValues((current) => ({
            ...current,
            trainingFrequency: value,
          }))
        }
      />

      {state.errors.form ? (
        <p className="text-sm leading-6 text-destructive">{state.errors.form}</p>
      ) : null}

      {state.message && intent === "settings" ? (
        <p className="text-sm leading-6 text-muted">{state.message}</p>
      ) : null}

      <SubmitButton intent={intent} />
    </form>
  );
}
