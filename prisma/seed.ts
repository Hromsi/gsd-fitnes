import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash("demo-password", 12);

  await prisma.user.upsert({
    where: {
      email: "demo@workout-planner.local",
    },
    update: {
      passwordHash,
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
          setupCompleted: false,
        },
      },
    },
  });
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
