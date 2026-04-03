CREATE TYPE "ExerciseCategory" AS ENUM ('upper', 'lower', 'full_body', 'core', 'cardio');
CREATE TYPE "PlanDayType" AS ENUM ('workout', 'rest');

CREATE TABLE "Exercise" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "equipment" "Equipment" NOT NULL,
  "level" "FitnessLevel" NOT NULL,
  "category" "ExerciseCategory" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Exercise_name_key" ON "Exercise"("name");
