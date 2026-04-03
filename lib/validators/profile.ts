import { z } from "zod";

export const goalValues = ["lose_weight", "build_muscle", "maintain"] as const;
export const fitnessLevelValues = ["beginner", "intermediate"] as const;
export const equipmentValues = ["none", "home", "gym"] as const;
export const trainingFrequencyValues = ["3", "4", "5"] as const;

export const goalOptions = [
  { value: "lose_weight", label: "Lose weight" },
  { value: "build_muscle", label: "Build muscle" },
  { value: "maintain", label: "Maintain" },
] as const;

export const fitnessLevelOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
] as const;

export const equipmentOptions = [
  { value: "none", label: "No equipment" },
  { value: "home", label: "Home setup" },
  { value: "gym", label: "Gym access" },
] as const;

export const trainingFrequencyOptions = [
  { value: "3", label: "3 days per week" },
  { value: "4", label: "4 days per week" },
  { value: "5", label: "5 days per week" },
] as const;

export const profileSchema = z.object({
  goal: z.enum(goalValues),
  fitnessLevel: z.enum(fitnessLevelValues),
  equipment: z.enum(equipmentValues),
  trainingFrequency: z
    .enum(trainingFrequencyValues)
    .transform((value) => Number(value))
    .refine((value) => value >= 3 && value <= 5, {
      message: "Training frequency must be between 3 and 5 days.",
    }),
});

export type ProfileFormValues = {
  goal: (typeof goalOptions)[number]["value"];
  fitnessLevel: (typeof fitnessLevelOptions)[number]["value"];
  equipment: (typeof equipmentOptions)[number]["value"];
  trainingFrequency: string;
};

export type ParsedProfileValues = z.output<typeof profileSchema>;

export type ProfileFormErrors = Partial<
  Record<keyof ProfileFormValues | "form", string>
>;

export type ProfileFormState = {
  success: boolean;
  errors: ProfileFormErrors;
  values: Partial<ProfileFormValues>;
  message?: string;
  showSuccess?: boolean;
  redirectTo?: string;
};

export const emptyProfileFormState: ProfileFormState = {
  success: false,
  errors: {},
  values: {},
};

export function buildProfileValuesFromFormData(
  formData: FormData,
): ProfileFormValues {
  return {
    goal: formData.get("goal")?.toString() as ProfileFormValues["goal"],
    fitnessLevel: formData.get("fitnessLevel")?.toString() as ProfileFormValues["fitnessLevel"],
    equipment: formData.get("equipment")?.toString() as ProfileFormValues["equipment"],
    trainingFrequency: formData.get("trainingFrequency")?.toString() ?? "",
  };
}

export function profileValuesFromProfile(profile: {
  goal: string | null;
  fitnessLevel: string | null;
  equipment: string | null;
  trainingFrequency: number | null;
} | null): Partial<ProfileFormValues> {
  if (!profile) {
    return {};
  }

  return {
    goal: profile.goal as ProfileFormValues["goal"] | undefined,
    fitnessLevel: profile.fitnessLevel as ProfileFormValues["fitnessLevel"] | undefined,
    equipment: profile.equipment as ProfileFormValues["equipment"] | undefined,
    trainingFrequency:
      typeof profile.trainingFrequency === "number"
        ? String(profile.trainingFrequency)
        : undefined,
  };
}

export function fieldErrorMapFromZod(error: z.ZodError): ProfileFormErrors {
  return error.issues.reduce<ProfileFormErrors>((acc, issue) => {
    const field = issue.path[0];

    if (typeof field === "string" && !(field in acc)) {
      acc[field as keyof ProfileFormErrors] = issue.message;
    }

    return acc;
  }, {});
}
