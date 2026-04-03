import type { ExerciseCategory, Goal } from "@prisma/client";
import { getExercisesForGenerator } from "@/lib/workouts/exercise-library";
import { getWeeklyTemplate } from "@/lib/workouts/templates";
import type {
  GeneratedWorkoutDay,
  GeneratedWorkoutPlan,
  GeneratorProfile,
} from "@/lib/workouts/types";

function getExerciseCount(goal: Goal, category: ExerciseCategory) {
  if (category === "cardio") {
    return 1;
  }

  if (category === "core") {
    return goal === "build_muscle" ? 4 : 3;
  }

  if (goal === "build_muscle") {
    return 5;
  }

  if (goal === "lose_weight") {
    return 4;
  }

  return 4;
}

function getGuidance(goal: Goal, category: ExerciseCategory) {
  if (category === "cardio") {
    return goal === "lose_weight" ? "25-30 minutes at a steady pace" : "20-25 minutes at a steady pace";
  }

  if (goal === "build_muscle") {
    return "4 sets x 8-10 reps";
  }

  if (goal === "lose_weight") {
    return "3 sets x 12-15 reps";
  }

  return "3 sets x 10-12 reps";
}

export async function generateWorkoutPlan(
  profile: GeneratorProfile,
): Promise<GeneratedWorkoutPlan> {
  const template = getWeeklyTemplate(profile.trainingFrequency);

  const days = await Promise.all(
    template.map(async (day): Promise<GeneratedWorkoutDay> => {
      if (day.type === "rest" || !day.category) {
        return {
          dayIndex: day.dayIndex,
          dayLabel: day.dayLabel,
          type: "rest",
          category: null,
          guidance: null,
          exercises: [],
        };
      }

      const exercises = await getExercisesForGenerator({
        category: day.category,
        equipment: profile.equipment,
        level: profile.fitnessLevel,
      });

      const selectedExercises = exercises
        .slice(0, getExerciseCount(profile.goal, day.category))
        .map((exercise, index) => ({
          exerciseId: exercise.id,
          sortOrder: index,
        }));

      return {
        dayIndex: day.dayIndex,
        dayLabel: day.dayLabel,
        type: "workout",
        category: day.category,
        guidance: getGuidance(profile.goal, day.category),
        exercises: selectedExercises,
      };
    }),
  );

  return {
    goal: profile.goal,
    fitnessLevel: profile.fitnessLevel,
    equipment: profile.equipment,
    trainingFrequency: profile.trainingFrequency,
    days,
  };
}
