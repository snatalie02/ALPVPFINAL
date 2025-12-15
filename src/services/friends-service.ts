import { AddFriendRequest } from "../models/friends-model"
import { prismaClient } from "../utils/database-util"
import { ResponseError } from "../error/response-error"
import { Validation } from "../validations/validation"
import { FriendsValidation } from "../validations/friends-validation"

export class FriendsService {

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

}




