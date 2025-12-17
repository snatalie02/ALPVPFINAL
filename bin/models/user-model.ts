export interface RegisterUserRequest {
  username: string
  password: string
}

export interface LoginUserRequest {
  username: string
  password: string
}

export interface UserJWTPayload {
  id: number
  username: string
}
