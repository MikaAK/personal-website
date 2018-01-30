import {User} from './user'

export type CurrentSessionState = {
  user: User | null
  isFirstLogin: boolean
  isEmailVerified: boolean
}
