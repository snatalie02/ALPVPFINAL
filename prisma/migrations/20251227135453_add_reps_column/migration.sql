/*
  Warnings:

  - Added the required column `reps` to the `history_workouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "history_workouts" ADD COLUMN     "reps" INTEGER NOT NULL;
