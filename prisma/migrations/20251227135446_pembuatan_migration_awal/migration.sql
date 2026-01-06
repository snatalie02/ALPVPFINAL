/*
  Warnings:

  - You are about to drop the column `calories` on the `workout_list` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "workout_list" DROP COLUMN "calories",
ADD COLUMN     "calories_per_minute" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "description" TEXT;

-- AddForeignKey
ALTER TABLE "history_workouts" ADD CONSTRAINT "history_workouts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_workouts" ADD CONSTRAINT "history_workouts_workout_list_id_fkey" FOREIGN KEY ("workout_list_id") REFERENCES "workout_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
