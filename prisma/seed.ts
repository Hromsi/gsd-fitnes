import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash("demo-password", 12);
  const seededExercises = [
    {
      name: "Push-Up",
      description: "A bodyweight pressing movement for chest, shoulders, and triceps.",
      equipment: "none",
      level: "beginner",
      category: "upper",
    },
    {
      name: "Dumbbell Floor Press",
      description: "A home-friendly pressing movement to build upper-body strength.",
      equipment: "home",
      level: "intermediate",
      category: "upper",
    },
    {
      name: "Lat Pulldown",
      description: "A gym machine pull for upper-back and lat development.",
      equipment: "gym",
      level: "beginner",
      category: "upper",
    },
    {
      name: "Bodyweight Squat",
      description: "A foundational lower-body exercise for legs and glutes.",
      equipment: "none",
      level: "beginner",
      category: "lower",
    },
    {
      name: "Dumbbell Romanian Deadlift",
      description: "A hip-hinge movement for hamstrings and glutes.",
      equipment: "home",
      level: "intermediate",
      category: "lower",
    },
    {
      name: "Leg Press",
      description: "A gym-based lower-body exercise for controlled leg strength work.",
      equipment: "gym",
      level: "beginner",
      category: "lower",
    },
    {
      name: "Burpee",
      description: "A full-body conditioning move that combines squat, plank, and jump.",
      equipment: "none",
      level: "intermediate",
      category: "full_body",
    },
    {
      name: "Dumbbell Thruster",
      description: "A full-body movement pairing a squat with an overhead press.",
      equipment: "home",
      level: "intermediate",
      category: "full_body",
    },
    {
      name: "Kettlebell Swing",
      description: "A powerful full-body hip-hinge movement for strength and conditioning.",
      equipment: "gym",
      level: "intermediate",
      category: "full_body",
    },
    {
      name: "Dead Bug",
      description: "A controlled core exercise for trunk stability and coordination.",
      equipment: "none",
      level: "beginner",
      category: "core",
    },
    {
      name: "Weighted Sit-Up",
      description: "A more demanding core exercise using light external resistance.",
      equipment: "home",
      level: "intermediate",
      category: "core",
    },
    {
      name: "Cable Wood Chop",
      description: "A rotational core exercise using a cable stack.",
      equipment: "gym",
      level: "intermediate",
      category: "core",
    },
    {
      name: "Brisk Walk",
      description: "A steady, low-impact cardio option for recovery and conditioning.",
      equipment: "none",
      level: "beginner",
      category: "cardio",
    },
    {
      name: "Jump Rope Intervals",
      description: "A home-friendly cardio interval option that raises heart rate quickly.",
      equipment: "home",
      level: "intermediate",
      category: "cardio",
    },
    {
      name: "Stationary Bike",
      description: "A gym-based cardio machine option for controlled endurance work.",
      equipment: "gym",
      level: "beginner",
      category: "cardio",
    },
  ] as const;

  await prisma.user.upsert({
    where: {
      email: "demo@workout-planner.local",
    },
    update: {
      passwordHash,
      profile: {
        upsert: {
          update: {
            goal: "build_muscle",
            fitnessLevel: "beginner",
            equipment: "home",
            trainingFrequency: 3,
            setupCompleted: true,
          },
          create: {
            goal: "build_muscle",
            fitnessLevel: "beginner",
            equipment: "home",
            trainingFrequency: 3,
            setupCompleted: true,
          },
        },
      },
    },
    create: {
      email: "demo@workout-planner.local",
      name: "Demo User",
      passwordHash,
      profile: {
        create: {
          goal: "build_muscle",
          fitnessLevel: "beginner",
          equipment: "home",
          trainingFrequency: 3,
          setupCompleted: true,
        },
      },
    },
  });

  for (const exercise of seededExercises) {
    await prisma.exercise.upsert({
      where: {
        name: exercise.name,
      },
      update: {
        description: exercise.description,
        equipment: exercise.equipment,
        level: exercise.level,
        category: exercise.category,
      },
      create: exercise,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
