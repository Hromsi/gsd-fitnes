import type {
  Equipment,
  Exercise,
  ExerciseCategory as PrismaExerciseCategory,
  FitnessLevel,
  Goal,
  WorkoutDay,
  WorkoutExercise,
  WorkoutPlan,
} from "@prisma/client";

export type GeneratorProfile = {
  goal: Goal;
  fitnessLevel: FitnessLevel;
  equipment: Equipment;
  trainingFrequency: number;
};

export type TemplateDay = {
  dayIndex: number;
  dayLabel: string;
  type: "workout" | "rest";
  category: PrismaExerciseCategory | null;
};

export type GeneratedWorkoutExercise = {
  exerciseId: string;
  sortOrder: number;
};

export type GeneratedWorkoutDay = {
  dayIndex: number;
  dayLabel: string;
  type: "workout" | "rest";
  category: PrismaExerciseCategory | null;
  guidance: string | null;
  exercises: GeneratedWorkoutExercise[];
};

export type GeneratedWorkoutPlan = {
  goal: Goal;
  fitnessLevel: FitnessLevel;
  equipment: Equipment;
  trainingFrequency: number;
  days: GeneratedWorkoutDay[];
};

export type ExerciseRecord = Pick<
  Exercise,
  "id" | "name" | "description" | "equipment" | "level" | "category"
>;

export type PersistedWorkoutPlan = WorkoutPlan & {
  workoutDays: (WorkoutDay & {
    exercises: (WorkoutExercise & {
      exercise: ExerciseRecord;
    })[];
  })[];
};
