CREATE TYPE "Goal" AS ENUM ('lose_weight', 'build_muscle', 'maintain');
CREATE TYPE "FitnessLevel" AS ENUM ('beginner', 'intermediate');
CREATE TYPE "Equipment" AS ENUM ('none', 'home', 'gym');

ALTER TABLE "Profile"
RENAME COLUMN "equipmentAccess" TO "equipment";

ALTER TABLE "Profile"
ALTER COLUMN "goal" TYPE "Goal"
USING (
  CASE
    WHEN "goal" IS NULL THEN NULL
    ELSE "goal"::"Goal"
  END
);

ALTER TABLE "Profile"
ALTER COLUMN "fitnessLevel" TYPE "FitnessLevel"
USING (
  CASE
    WHEN "fitnessLevel" IS NULL THEN NULL
    ELSE "fitnessLevel"::"FitnessLevel"
  END
);

ALTER TABLE "Profile"
ALTER COLUMN "equipment" TYPE "Equipment"
USING (
  CASE
    WHEN "equipment" IS NULL THEN NULL
    ELSE "equipment"::"Equipment"
  END
);
