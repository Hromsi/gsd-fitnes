import { requireCurrentUserId } from "@/lib/user-ownership";
import { getActivePlanDay } from "@/lib/workouts/get-active-plan-day";
import { WorkoutDetailModal } from "@/components/workouts/workout-detail-modal";

type WorkoutDayPageProps = {
  params: Promise<{
    dayId: string;
  }>;
};

export default async function WorkoutDayPage({
  params,
}: WorkoutDayPageProps) {
  const { dayId } = await params;
  const userId = await requireCurrentUserId();
  const { day, previousDayId, nextDayId } = await getActivePlanDay(userId, dayId);

  return (
    <WorkoutDetailModal
      closeHref="/app"
      day={day}
      nextHref={nextDayId ? `/app/day/${nextDayId}` : null}
      previousHref={previousDayId ? `/app/day/${previousDayId}` : null}
      presentation="page"
    />
  );
}
