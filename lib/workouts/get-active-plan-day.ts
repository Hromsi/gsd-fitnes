import { notFound } from "next/navigation";
import { getActiveWorkoutPlan } from "@/lib/workouts/get-active-plan";
import type { ActiveWorkoutDay, ActiveWorkoutPlan } from "@/lib/workouts/types";

export async function getActivePlanDay(userId: string, dayId: string): Promise<{
  plan: ActiveWorkoutPlan;
  day: ActiveWorkoutDay;
  previousDayId: string | null;
  nextDayId: string | null;
}> {
  const activePlan = await getActiveWorkoutPlan(userId);

  if (!activePlan) {
    notFound();
  }

  const dayIndex = activePlan.workoutDays.findIndex((day) => day.id === dayId);

  if (dayIndex === -1) {
    notFound();
  }

  return {
    plan: activePlan,
    day: activePlan.workoutDays[dayIndex],
    previousDayId: activePlan.workoutDays[dayIndex - 1]?.id ?? null,
    nextDayId: activePlan.workoutDays[dayIndex + 1]?.id ?? null,
  };
}
