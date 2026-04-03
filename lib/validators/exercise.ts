export const exerciseCategoryValues = [
  "upper",
  "lower",
  "full_body",
  "core",
  "cardio",
] as const;

export const exerciseLevelValues = ["beginner", "intermediate"] as const;

export const exerciseEquipmentValues = ["none", "home", "gym"] as const;

export type ExerciseCategory = (typeof exerciseCategoryValues)[number];
export type ExerciseLevel = (typeof exerciseLevelValues)[number];
export type ExerciseEquipment = (typeof exerciseEquipmentValues)[number];

export const exerciseCategoryLabels: Record<ExerciseCategory, string> = {
  upper: "Upper body",
  lower: "Lower body",
  full_body: "Full body",
  core: "Core",
  cardio: "Cardio",
};
