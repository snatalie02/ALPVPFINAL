import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Mulai seeding workout_list...");
    const exercises = [
    {
    workout_name: "Push Up",
    description: "Gerakan bodyweight untuk melatih dada, bahu, dan trisep.",
    calories_per_minute: 8,
    },
    {
    workout_name: "Pull Up",
    description: "Latihan menarik tubuh ke atas untuk melatih punggung dan lengan.",
    calories_per_minute: 9,
    },
    {
    workout_name: "Squat",
    description: "Gerakan dasar untuk melatih otot paha, glutes, dan core.",
    calories_per_minute: 7,
    },
    {
    workout_name: "Lunges",
    description: "Latihan kaki yang meningkatkan kekuatan dan keseimbangan.",
    calories_per_minute: 7,
    },
    {
    workout_name: "Plank",
    description: "Latihan statis untuk memperkuat core dan stabilitas tubuh.",
    calories_per_minute: 4,
    },
    {
    workout_name: "Sit Up",
    description: "Gerakan klasik untuk melatih otot perut.",
    calories_per_minute: 6,
    },
    {
    workout_name: "Crunch",
    description: "Latihan perut dengan fokus pada otot abdominal.",
    calories_per_minute: 5,
    },
    {
    workout_name: "Burpees",
    description: "Latihan full body dengan intensitas tinggi.",
    calories_per_minute: 14,
    },
    {
    workout_name: "Mountain Climbers",
    description: "Gerakan cardio cepat untuk melatih core dan stamina.",
    calories_per_minute: 12,
    },
    {
    workout_name: "Jumping Jacks",
    description: "Latihan cardio ringan untuk pemanasan dan pembakaran kalori.",
    calories_per_minute: 10,
    },
    {
    workout_name: "Bench Press",
    description: "Latihan angkat beban untuk melatih otot dada dan trisep.",
    calories_per_minute: 7,
    },
    {
    workout_name: "Incline Bench Press",
    description: "Variasi bench press untuk fokus dada bagian atas.",
    calories_per_minute: 7,
    },
    {
    workout_name: "Deadlift",
    description: "Latihan compound untuk melatih punggung, kaki, dan core.",
    calories_per_minute: 8,
    },
    {
    workout_name: "Barbell Squat",
    description: "Latihan beban berat untuk kekuatan kaki dan glutes.",
    calories_per_minute: 8,
    },
    {
    workout_name: "Shoulder Press",
    description: "Latihan angkat beban untuk melatih bahu.",
    calories_per_minute: 6,
    },
    {
    workout_name: "Lateral Raise",
    description: "Latihan isolasi untuk membentuk bahu samping.",
    calories_per_minute: 5,
    },
    {
    workout_name: "Bicep Curl",
    description: "Latihan untuk membangun otot lengan depan.",
    calories_per_minute: 5,
    },
    {
    workout_name: "Tricep Dips",
    description: "Latihan bodyweight untuk melatih trisep.",
    calories_per_minute: 7,
    },
    {
    workout_name: "Lat Pulldown",
    description: "Latihan mesin untuk melatih otot punggung lebar.",
    calories_per_minute: 6,
    },
    {
    workout_name: "Seated Row",
    description: "Latihan tarik untuk memperkuat punggung tengah.",
    calories_per_minute: 6,
    },
    {
    workout_name: "Chest Fly",
    description: "Latihan isolasi untuk membentuk otot dada.",
    calories_per_minute: 5,
    },
    {
    workout_name: "Leg Press",
    description: "Latihan mesin untuk melatih paha dan glutes.",
    calories_per_minute: 7,
    },
    {
    workout_name: "Leg Curl",
    description: "Latihan isolasi untuk otot paha belakang.",
    calories_per_minute: 5,
    },
    {
    workout_name: "Leg Extension",
    description: "Latihan mesin untuk otot paha depan.",
    calories_per_minute: 5,
    },
    {
    workout_name: "Calf Raise",
    description: "Latihan untuk memperkuat otot betis.",
    calories_per_minute: 4,
    },
    {
    workout_name: "Russian Twist",
    description: "Latihan core dengan gerakan rotasi tubuh.",
    calories_per_minute: 6,
    },
    {
    workout_name: "Hanging Leg Raise",
    description: "Latihan perut tingkat lanjut dengan menggantung.",
    calories_per_minute: 7,
    },
    {
    workout_name: "Bicycle Crunch",
    description: "Latihan perut dinamis yang melibatkan rotasi.",
    calories_per_minute: 6,
    },
    {
    workout_name: "Jump Squat",
    description: "Latihan eksplosif untuk kekuatan dan cardio.",
    calories_per_minute: 11,
    },
    {
    workout_name: "High Knees",
    description: "Latihan cardio cepat untuk meningkatkan detak jantung.",
    calories_per_minute: 12,
    },
    {
    workout_name: "Treadmill Running",
    description: "Lari di treadmill untuk meningkatkan daya tahan.",
    calories_per_minute: 13,
    },
    {
    workout_name: "Cycling",
    description: "Latihan cardio dengan sepeda statis.",
    calories_per_minute: 10,
    },
    {
    workout_name: "Rowing Machine",
    description: "Latihan cardio full body dengan mesin rowing.",
    calories_per_minute: 12,
    },
    {
    workout_name: "Jump Rope",
    description: "Latihan lompat tali dengan intensitas tinggi.",
    calories_per_minute: 14,
    },
    {
    workout_name: "Wall Sit",
    description: "Latihan statis untuk kekuatan paha.",
    calories_per_minute: 4,
    },
    {
    workout_name: "Glute Bridge",
    description: "Latihan untuk mengaktifkan dan memperkuat glutes.",
    calories_per_minute: 5,
    },
    {
    workout_name: "Hip Thrust",
    description: "Latihan fokus glutes dengan beban.",
    calories_per_minute: 6,
    },
    {
    workout_name: "Farmer Walk",
    description: "Latihan membawa beban untuk grip dan core.",
    calories_per_minute: 8,
    },
    {
    workout_name: "Kettlebell Swing",
    description: "Latihan eksplosif untuk kekuatan dan cardio.",
    calories_per_minute: 12,
    },
    {
    workout_name: "Battle Rope",
    description: "Latihan cardio intensitas tinggi dengan tali.",
    calories_per_minute: 15,
    },
    {
    workout_name: "Bear Crawl",
    description: "Latihan bodyweight untuk kekuatan dan koordinasi.",
    calories_per_minute: 10,
    },
    {
    workout_name: "Superman Hold",
    description: "Latihan statis untuk memperkuat punggung bawah.",
    calories_per_minute: 4,
    },
    {
    workout_name: "Side Plank",
    description: "Variasi plank untuk melatih core samping.",
    calories_per_minute: 4,
    },
    {
    workout_name: "Stretching",
    description: "Gerakan peregangan untuk meningkatkan fleksibilitas.",
    calories_per_minute: 3,
    },
    {
    workout_name: "Yoga",
    description: "Latihan fleksibilitas dan pernapasan untuk relaksasi.",
    calories_per_minute: 4,
    },
    {
    workout_name: "Pilates",
    description: "Latihan kontrol tubuh untuk kekuatan dan fleksibilitas.",
    calories_per_minute: 5,
    },
    {
    workout_name: "Shadow Boxing",
    description: "Latihan cardio dengan simulasi gerakan tinju.",
    calories_per_minute: 11,
    },
];

    // console.log("Mulai seeding...");

    // for (const exercise of exercises) {
    // await prisma.workoutList.create({
    // data: exercise,
    // });
//}    

for (const exercise of exercises) {
    await prisma.workoutList.upsert({
      where: { workout_name: exercise.workout_name },
      update: {},
      create: exercise,
    });
  }
    // console.log("Inserted:", result.workout_name);
    console.log("Seeding selesai!");
}

main()
    .catch((e) => {
    console.error("❌ Seeding error:",e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});
