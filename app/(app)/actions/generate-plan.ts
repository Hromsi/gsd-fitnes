"use server";

import { requireCurrentUser } from "@/lib/user-ownership";
import { generateWorkoutPlan } from "@/lib/workouts/generate-plan";
import { saveGeneratedPlan } from "@/lib/workouts/save-generated-plan";

type GeneratePlanState = {
  success: boolean;
  error?: string;
  planSummary?: string;
};

export async function generatePlanAction(
  prevState: GeneratePlanState,
  formData: FormData,
): Promise<GeneratePlanState> {
  void prevState;
  void formData;

  const currentUser = await requireCurrentUser();

  if (!currentUser.profile?.goal ||
      !currentUser.profile.fitnessLevel ||
      !currentUser.profile.equipment ||
      !currentUser.profile.trainingFrequency) {
    return {
      success: false,
      error: "Complete your profile before generating a workout plan.",
    };
  }

  const plan = await generateWorkoutPlan({
    goal: currentUser.profile.goal,
    fitnessLevel: currentUser.profile.fitnessLevel,
    equipment: currentUser.profile.equipment,
    trainingFrequency: currentUser.profile.trainingFrequency,
  });

  const savedPlan = await saveGeneratedPlan({
    userId: currentUser.id,
    plan,
  });

  return {
    success: true,
    planSummary: `Created a ${savedPlan.trainingFrequency}-day plan with ${savedPlan.workoutDays.filter((day) => day.type === "workout").length} workout days.`,
  };
}
