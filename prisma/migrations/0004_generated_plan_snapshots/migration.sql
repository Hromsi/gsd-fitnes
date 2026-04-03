CREATE TABLE "WorkoutPlan" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "goal" "Goal" NOT NULL,
  "fitnessLevel" "FitnessLevel" NOT NULL,
  "equipment" "Equipment" NOT NULL,
  "trainingFrequency" INTEGER NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "WorkoutPlan_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WorkoutDay" (
  "id" TEXT NOT NULL,
  "workoutPlanId" TEXT NOT NULL,
  "dayIndex" INTEGER NOT NULL,
  "dayLabel" TEXT NOT NULL,
  "type" "PlanDayType" NOT NULL,
  "category" "ExerciseCategory",
  "guidance" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "WorkoutDay_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WorkoutExercise" (
  "id" TEXT NOT NULL,
  "workoutDayId" TEXT NOT NULL,
  "exerciseId" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "WorkoutExercise_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "WorkoutDay_workoutPlanId_dayIndex_key" ON "WorkoutDay"("workoutPlanId", "dayIndex");
CREATE UNIQUE INDEX "WorkoutExercise_workoutDayId_sortOrder_key" ON "WorkoutExercise"("workoutDayId", "sortOrder");

ALTER TABLE "WorkoutPlan"
ADD CONSTRAINT "WorkoutPlan_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "WorkoutDay"
ADD CONSTRAINT "WorkoutDay_workoutPlanId_fkey"
FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "WorkoutExercise"
ADD CONSTRAINT "WorkoutExercise_workoutDayId_fkey"
FOREIGN KEY ("workoutDayId") REFERENCES "WorkoutDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "WorkoutExercise"
ADD CONSTRAINT "WorkoutExercise_exerciseId_fkey"
FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
