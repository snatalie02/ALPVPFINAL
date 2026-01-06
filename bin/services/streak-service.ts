//service --> chef bagian logic

import { StreakCheckInRequest, StreakResponse, StreakStatusResponse } from "../models/streak-model"
import { prismaClient } from "../utils/database-util"
import { ResponseError } from "../error/response-error"
import { Validation } from "../validations/validation"
import { StreakValidation } from "../validations/streak-validation"

export class StreakService {

  // 🔥 MAIN FEATURE: Check-in Streak
  static async checkIn(currentUserId: number, req: StreakCheckInRequest): Promise<StreakResponse> {
    const validated = Validation.validate(StreakValidation.CHECK_IN, req)
    const friendId = validated.friend_id

    // 1️⃣ Cek apakah mereka berteman (mutual friendship)
    const friendship = await prismaClient.friends.findUnique({
      where: {
        following_user_id_followed_user_id: {
          following_user_id: currentUserId,
          followed_user_id: friendId
        }
      }
    })

    if (!friendship) {
      throw new ResponseError(400, "You are not friends with this user")
    }

    // 2️⃣ Cek apakah user sudah check-in hari ini
    if (friendship.has_set_streak_today) {
      throw new ResponseError(400, "You have already checked in today with this friend")
    }

    // 3️⃣ Ambil friendship dari sisi teman (untuk cek apakah teman sudah check-in)
    const reverseFriendship = await prismaClient.friends.findUnique({
      where: {
        following_user_id_followed_user_id: {
          following_user_id: friendId,
          followed_user_id: currentUserId
        }
      }
    })

    if (!reverseFriendship) {
      throw new ResponseError(500, "Friendship data inconsistent")
    }

    // 4️⃣ Cek apakah ini hari yang sama dengan last check-in
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Reset ke midnight untuk perbandingan hari

    const lastCheckIn = new Date(friendship.time_stamp)
    lastCheckIn.setHours(0, 0, 0, 0)

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const isSameDay = today.getTime() === lastCheckIn.getTime()
    const isYesterday = yesterday.getTime() === lastCheckIn.getTime()

    // 5️⃣ LOGIKA STREAK:
    let newStreak = friendship.duration_streak
    let shouldIncrementStreak = false
    let shouldResetStreak = false

    // Cek apakah sudah lewat dari kemarin tanpa check-in
    if (!isSameDay && !isYesterday) {
      // Lebih dari 1 hari tidak check-in → RESET STREAK
      shouldResetStreak = true
      newStreak = 0
    }

    // Jika KEDUA sudah check-in di hari yang sama, streak bertambah
    if (reverseFriendship.has_set_streak_today && isSameDay && !shouldResetStreak) {
      shouldIncrementStreak = true
      newStreak += 1
    } else if (!reverseFriendship.has_set_streak_today && isSameDay) {
      // Kalau teman belum check-in tapi masih hari ini, streak tetap (tunggu teman)
      newStreak = friendship.duration_streak
    }

    // 6️⃣ Update BOTH friendships dalam transaction
    await prismaClient.$transaction([
      // Update friendship dari current user -> friend
      prismaClient.friends.update({
        where: {
          following_user_id_followed_user_id: {
            following_user_id: currentUserId,
            followed_user_id: friendId
          }
        },
        data: {
          has_set_streak_today: true,
          time_stamp: new Date(),
          duration_streak: shouldIncrementStreak ? newStreak : friendship.duration_streak
        }
      }),

      // Update friendship dari friend -> current user (mutual update)
      prismaClient.friends.update({
        where: {
          following_user_id_followed_user_id: {
            following_user_id: friendId,
            followed_user_id: currentUserId
          }
        },
        data: {
          duration_streak: shouldIncrementStreak ? newStreak : reverseFriendship.duration_streak,
          time_stamp: shouldIncrementStreak ? new Date() : reverseFriendship.time_stamp
        }
      })
    ])

    return {
      message: shouldIncrementStreak 
        ? `Streak increased! Both of you checked in today 🔥` 
        : `Check-in recorded. Waiting for your friend to check in today.`,
      current_streak: newStreak,
      has_checked_in_today: true
    }
  }

  // 📊 Get Streak Status with a specific friend
  static async getStreakStatus(currentUserId: number, friendId: number): Promise<StreakStatusResponse> {
    // Ambil friendship data
    const friendship = await prismaClient.friends.findUnique({
      where: {
        following_user_id_followed_user_id: {
          following_user_id: currentUserId,
          followed_user_id: friendId
        }
      },
      include: {
        followed_user: true // Include friend's data
      }
    })

    if (!friendship) {
      throw new ResponseError(400, "You are not friends with this user")
    }

    // Ambil reverse friendship untuk cek status teman
    const reverseFriendship = await prismaClient.friends.findUnique({
      where: {
        following_user_id_followed_user_id: {
          following_user_id: friendId,
          followed_user_id: currentUserId
        }
      }
    })

    return {
      friend_id: friendId,
      friend_username: friendship.followed_user.username,
      current_streak: friendship.duration_streak,
      my_check_in_status: friendship.has_set_streak_today,
      friend_check_in_status: reverseFriendship?.has_set_streak_today || false,
      last_updated: friendship.time_stamp
    }
  }

  // 🔄 Reset Streak Flags (Should be called daily via cron job)
  // Fungsi ini akan mereset has_set_streak_today jadi false setiap hari
  static async resetDailyStreakFlags(): Promise<void> {
    await prismaClient.friends.updateMany({
      data: {
        has_set_streak_today: false
      }
    })
  }

  // 📋 Get All Streaks for Current User
  static async getAllStreaks(currentUserId: number) {
    const friendships = await prismaClient.friends.findMany({
      where: {
        following_user_id: currentUserId
      },
      include: {
        followed_user: true
      }
    })

    return friendships.map(f => ({
      friend_id: f.followed_user.id,
      friend_username: f.followed_user.username,
      current_streak: f.duration_streak,
      has_checked_in_today: f.has_set_streak_today,
      last_updated: f.time_stamp
    }))
  }
}