"use server";

import { prisma } from "@/lib/prisma";
import { unstable_update } from "@/lib/auth";
import { requireCurrentUser } from "@/lib/user-ownership";
import {
  buildProfileValuesFromFormData,
  emptyProfileFormState,
  fieldErrorMapFromZod,
  profileSchema,
  profileValuesFromProfile,
  type ProfileFormState,
} from "@/lib/validators/profile";

export async function saveProfileAction(
  _prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const currentUser = await requireCurrentUser();
  const rawValues = buildProfileValuesFromFormData(formData);
  const intent = formData.get("intent")?.toString() === "settings" ? "settings" : "onboarding";

  const parsed = profileSchema.safeParse(rawValues);

  if (!parsed.success) {
    return {
      ...emptyProfileFormState,
      errors: fieldErrorMapFromZod(parsed.error),
      values: rawValues,
    };
  }

  const existingProfile = currentUser.profile;

  const profile = await prisma.profile.upsert({
    where: {
      userId: currentUser.id,
    },
    update: {
      goal: parsed.data.goal,
      fitnessLevel: parsed.data.fitnessLevel,
      equipment: parsed.data.equipment,
      trainingFrequency: parsed.data.trainingFrequency,
      setupCompleted: true,
    },
    create: {
      userId: currentUser.id,
      goal: parsed.data.goal,
      fitnessLevel: parsed.data.fitnessLevel,
      equipment: parsed.data.equipment,
      trainingFrequency: parsed.data.trainingFrequency,
      setupCompleted: true,
    },
  });

  await unstable_update({
    user: {
      id: currentUser.id,
      setupCompleted: true,
    },
  });

  if (intent === "onboarding" && !existingProfile?.setupCompleted) {
    return {
      success: true,
      errors: {},
      values: profileValuesFromProfile(profile),
      showSuccess: true,
      redirectTo: "/next-step",
    };
  }

  return {
    success: true,
    errors: {},
    values: profileValuesFromProfile(profile),
    message: "Profile updated.",
  };
}
