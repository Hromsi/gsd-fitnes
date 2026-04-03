import type { TemplateDay } from "@/lib/workouts/types";

export const weeklyTemplates: Record<number, TemplateDay[]> = {
  3: [
    { dayIndex: 0, dayLabel: "Day 1", type: "workout", category: "full_body" },
    { dayIndex: 1, dayLabel: "Day 2", type: "rest", category: null },
    { dayIndex: 2, dayLabel: "Day 3", type: "workout", category: "upper" },
    { dayIndex: 3, dayLabel: "Day 4", type: "rest", category: null },
    { dayIndex: 4, dayLabel: "Day 5", type: "workout", category: "lower" },
    { dayIndex: 5, dayLabel: "Day 6", type: "rest", category: null },
    { dayIndex: 6, dayLabel: "Day 7", type: "rest", category: null },
  ],
  4: [
    { dayIndex: 0, dayLabel: "Day 1", type: "workout", category: "upper" },
    { dayIndex: 1, dayLabel: "Day 2", type: "workout", category: "lower" },
    { dayIndex: 2, dayLabel: "Day 3", type: "rest", category: null },
    { dayIndex: 3, dayLabel: "Day 4", type: "workout", category: "full_body" },
    { dayIndex: 4, dayLabel: "Day 5", type: "rest", category: null },
    { dayIndex: 5, dayLabel: "Day 6", type: "workout", category: "cardio" },
    { dayIndex: 6, dayLabel: "Day 7", type: "rest", category: null },
  ],
  5: [
    { dayIndex: 0, dayLabel: "Day 1", type: "workout", category: "upper" },
    { dayIndex: 1, dayLabel: "Day 2", type: "workout", category: "lower" },
    { dayIndex: 2, dayLabel: "Day 3", type: "workout", category: "core" },
    { dayIndex: 3, dayLabel: "Day 4", type: "rest", category: null },
    { dayIndex: 4, dayLabel: "Day 5", type: "workout", category: "full_body" },
    { dayIndex: 5, dayLabel: "Day 6", type: "workout", category: "cardio" },
    { dayIndex: 6, dayLabel: "Day 7", type: "rest", category: null },
  ],
};

export function getWeeklyTemplate(trainingFrequency: number): TemplateDay[] {
  const template = weeklyTemplates[trainingFrequency];

  if (!template) {
    throw new Error(`No weekly template exists for frequency ${trainingFrequency}.`);
  }

  return template;
}
