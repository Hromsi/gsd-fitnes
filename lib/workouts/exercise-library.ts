import type { Equipment, FitnessLevel } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { ExerciseRecord } from "@/lib/workouts/types";
import type { ExerciseCategory } from "@/lib/validators/exercise";

function getCompatibleEquipment(equipment: Equipment) {
  switch (equipment) {
    case "none":
      return ["none"] as const;
    case "home":
      return ["none", "home"] as const;
    case "gym":
      return ["none", "home", "gym"] as const;
  }
}

function getCompatibleLevels(level: FitnessLevel) {
  switch (level) {
    case "beginner":
      return ["beginner"] as const;
    case "intermediate":
      return ["beginner", "intermediate"] as const;
  }
}

export async function getExerciseLibrary() {
  return prisma.exercise.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });
}

export async function getExercisesForGenerator(input: {
  category: ExerciseCategory;
  equipment: Equipment;
  level: FitnessLevel;
}) {
  return prisma.exercise.findMany({
    where: {
      category: input.category,
      equipment: {
        in: [...getCompatibleEquipment(input.equipment)],
      },
      level: {
        in: [...getCompatibleLevels(input.level)],
      },
    },
    orderBy: [{ level: "asc" }, { name: "asc" }],
  });
}

export function groupExercisesByCategory(exercises: ExerciseRecord[]) {
  return exercises.reduce<Record<ExerciseCategory, ExerciseRecord[]>>(
    (acc, exercise) => {
      acc[exercise.category].push(exercise);
      return acc;
    },
    {
      upper: [],
      lower: [],
      full_body: [],
      core: [],
      cardio: [],
    },
  );
}
