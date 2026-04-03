import { redirect } from "next/navigation";
import { requireCurrentUser } from "@/lib/user-ownership";
import { getActiveWorkoutPlan } from "@/lib/workouts/get-active-plan";
import { WeeklyPlanView } from "@/components/workouts/weekly-plan-view";

export default async function AppHomePage() {
  const currentUser = await requireCurrentUser();
  const activePlan = await getActiveWorkoutPlan(currentUser.id);

  if (!activePlan) {
    redirect("/next-step");
  }

  return <WeeklyPlanView plan={activePlan} />;
}
