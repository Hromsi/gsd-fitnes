import { prisma } from "@/lib/prisma";
import type { GeneratedWorkoutPlan, PersistedWorkoutPlan } from "@/lib/workouts/types";

export async function saveGeneratedPlan(params: {
  userId: string;
  plan: GeneratedWorkoutPlan;
}): Promise<PersistedWorkoutPlan> {
  return prisma.$transaction(async (tx) => {
    await tx.workoutPlan.updateMany({
      where: {
        userId: params.userId,
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });

    const createdPlan = await tx.workoutPlan.create({
      data: {
        userId: params.userId,
        goal: params.plan.goal,
        fitnessLevel: params.plan.fitnessLevel,
        equipment: params.plan.equipment,
        trainingFrequency: params.plan.trainingFrequency,
        isActive: true,
        workoutDays: {
          create: params.plan.days.map((day) => ({
            dayIndex: day.dayIndex,
            dayLabel: day.dayLabel,
            type: day.type,
            category: day.category,
            guidance: day.guidance,
            exercises: {
              create: day.exercises.map((exercise) => ({
                exerciseId: exercise.exerciseId,
                sortOrder: exercise.sortOrder,
              })),
            },
          })),
        },
      },
      include: {
        workoutDays: {
          include: {
            exercises: {
              include: {
                exercise: true,
              },
              orderBy: {
                sortOrder: "asc",
              },
            },
          },
          orderBy: {
            dayIndex: "asc",
          },
        },
      },
    });

    return createdPlan as PersistedWorkoutPlan;
  });
}
