import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ USERS
  const michelle = await prisma.user.create({
    data: {
      username: "michelle",
      password: "password123",
      target_calories_burn: 500,
      total_calories_burn: 0,
    },
  });

  const louis = await prisma.user.create({
    data: {
      username: "louis",
      password: "password123",
      target_calories_burn: 600,
      total_calories_burn: 0,
    },
  });

  // 2️⃣ WORKOUT LIST (OPTIONAL)
  const pushUp = await prisma.workoutList.create({
    data: {
      workout_name: "Push Up",
      calories: 100,
    },
  });

  // 3️⃣ FRIENDS (STREAK)
  await prisma.friends.createMany({
    data: [
      {
        following_user_id: michelle.id,
        followed_user_id: louis.id,
        duration_streak: 3,
        has_set_streak_today: false,
        time_stamp: new Date(),
      },
      {
        following_user_id: louis.id,
        followed_user_id: michelle.id,
        duration_streak: 3,
        has_set_streak_today: false,
        time_stamp: new Date(),
      },
    ],
  });

  // 4️⃣ HISTORY WORKOUT (OPTIONAL)
  await prisma.historyWorkouts.create({
    data: {
      workout_list_id: pushUp.id,
      user_id: michelle.id,
      calories_total_burn: 300,
      duration: 30,
      time_stamp: new Date(),
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
