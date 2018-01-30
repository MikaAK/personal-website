import {when} from 'ramda'

import {isNotNil} from '../util'

export const whenNotNil = <T>(fun: (items?: T[]) => T) => when(isNotNil, fun)
