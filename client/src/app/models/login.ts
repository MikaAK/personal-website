import {SessionInfo} from './session-info'
import {User} from './user'

export type LoginParams = {email: string, password: string}

export type LoginResponse = {
  sessionInfo: SessionInfo
  accountUser: User
}
