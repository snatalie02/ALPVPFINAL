-- fungsi file ini Blueprint SQL yang Prisma generate otomatis dari schema.prisma

-- Isinya:
-- CREATE TABLE → bikin tabel
-- CREATE INDEX → bikin unique constraint
-- ALTER TABLE ... FOREIGN KEY → bikin relasi
-- ⚠️ PENTING
-- TIDAK nulis file ini manual
-- Prisma yang nulis
-- JANGAN edit isinya

-- file muncul krn: 
-- 1. edit schema.prisma 
-- 2. jalani npx prisma migrate dev --name init_tables
-- 3. Prisma: bandingin schema vs DB, generate SQL, simpan SQL ke migration.sql, eksekusi SQL ke PostgreSQL, catet ke _prisma_migrations

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "target_calories_burn" INTEGER DEFAULT 0,
    "total_calories_burn" INTEGER DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friends" (
    "id" SERIAL NOT NULL,
    "following_user_id" INTEGER NOT NULL,
    "followed_user_id" INTEGER NOT NULL,
    "duration_streak" INTEGER NOT NULL DEFAULT 0,
    "has_set_streak_today" BOOLEAN NOT NULL DEFAULT false,
    "time_stamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_list" (
    "id" SERIAL NOT NULL,
    "workout_name" VARCHAR(100) NOT NULL,
    "calories" INTEGER NOT NULL,

    CONSTRAINT "workout_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history_workouts" (
    "id" SERIAL NOT NULL,
    "workout_list_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "calories_total_burn" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "time_stamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "history_workouts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "friends_following_user_id_followed_user_id_key" ON "friends"("following_user_id", "followed_user_id");

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_following_user_id_fkey" FOREIGN KEY ("following_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_followed_user_id_fkey" FOREIGN KEY ("followed_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
