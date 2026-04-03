import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { ActiveWorkoutPlan } from "@/lib/workouts/types";

export const getActiveWorkoutPlan = cache(
  async (userId: string): Promise<ActiveWorkoutPlan | null> => {
    return prisma.workoutPlan.findFirst({
      where: {
        userId,
        isActive: true,
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
      orderBy: {
        createdAt: "desc",
      },
    }) as Promise<ActiveWorkoutPlan | null>;
  },
);
