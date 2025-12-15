import { AddFriendRequest } from "../models/friends-model"
import { prismaClient } from "../utils/database-util"
import { ResponseError } from "../error/response-error"
import { Validation } from "../validations/validation"
import { FriendsValidation } from "../validations/friends-validation"

export class FriendsService {

  static async addFriend(currentUserId: number, req: AddFriendRequest) {
    // req : friend's username

    const validated = Validation.validate(FriendsValidation.ADD_FRIEND, req)
    // output : friend's name (format validated)

    const friend = await prismaClient.user.findUnique({ where: { username: validated.username } }) 
    // find friend by username 
    if (!friend) throw new ResponseError(400, "User not found")
      // check if the friends data exist in database

    if (friend.id === currentUserId) throw new ResponseError(400, "Cannot add yourself as friend")

    // Check already friends or no 
    // even tho frontend alrd hv func if friends the add button won't show but if frontend bypassed won't be an error
    const exists = await prismaClient.friends.findUnique({
      where: {
        following_user_id_followed_user_id: {
          following_user_id: currentUserId,
          followed_user_id: friend.id
        }
      }
    }).catch(() => null)

    if (exists) throw new ResponseError(400, "Already friends")

    // Create mutual friendship in a transaction
    await prismaClient.$transaction([
      // transaction : ensures both inserts succeed or both fail.
      // making the selected friend be user's friend
      prismaClient.friends.create({
        data: {
          following_user_id: currentUserId,
          followed_user_id: friend.id
        }
      }), 
      // making the user's be the selected friend's friend
      prismaClient.friends.create({
        data: {
          following_user_id: friend.id,
          followed_user_id: currentUserId
        }
      })
    ])

    return "Friend added successfully (mutual)"
  }

  static async getFriends(currentUserId: number) {
    const friends = await prismaClient.friends.findMany({
      // friends.findMany : queries the friends table in your database
      where: {
        following_user_id: currentUserId 
        // Filters friends table (contains many relationship) to only rows where following_user_id equals currentUserId 
      },
      include: {
        followed_user: true // fetch the friend data (oobject whole)if followed by the currentuser from user table to display the username NOT ONLY ID
      }
    })

    return friends.map(f => ({
      id: f.followed_user.id,
      username: f.followed_user.username,
      duration_streak: f.duration_streak,
      time_stamp: f.time_stamp
    }))

    /* example return map : 
        {
          id: 1,
          username: "Alice",
          duration_streak: 5,
          time_stamp: "2025-12-13T12:00:00Z"
        },
        {
          id: 2,
          username: "Sharon",
          duration_streak: 3,
          time_stamp: "2025-12-12T08:00:00Z"
        }
  */
  }

  // BAGIAN getSuggestions SEMUA : SHARON
  static async getSuggestions(currentUserId: number) {

    // 1. Get all friend IDs of current user
    const friendships = await prismaClient.friends.findMany({
      where: { following_user_id: currentUserId },
      // Filters friends table (contains many relationship) to only rows where following_user_id equals currentUserId 
      select: { followed_user_id: true }
      // select the friend's id if followed by the current user
    })
    // friendships = [ { followed_user_id: 2 }, { followed_user_id: 5 }]

    const friendIds = friendships.map(f => f.followed_user_id) 
    // list of followed_user_id 
    // friendIds = [2, 5]

    // 2. Query all users NOT in that list, and not current user
    const suggestions = await prismaClient.user.findMany({
      where: {
        id: {
          not: currentUserId, // not the user
          notIn: friendIds // not friend
        }
      },
      select: {
        id: true,
        username: true
      }
    })

    return suggestions // return id & name for strangers
  }

  static async searchUsers(query: string) {

      return prismaClient.user.findMany({
        where: {
          username: {
            contains: query, // find in user table username column where username contains the searched letter
            mode: "insensitive", // "ALI" == "ali" 
          },
        },
        select: {
          id: true, // returns only id & username
          username: true,
        },
      })
  }

}









