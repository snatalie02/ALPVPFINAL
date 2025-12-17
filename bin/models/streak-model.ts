export interface StreakCheckInRequest {
  friend_id: number // ID teman yang mau di-check-in bareng
}

export interface StreakResponse {
  message: string
  current_streak: number
  has_checked_in_today: boolean
}

export interface StreakStatusResponse {
  friend_id: number
  friend_username: string
  current_streak: number
  my_check_in_status: boolean
  friend_check_in_status: boolean
  last_updated: Date
}