import {propSatisfies} from 'ramda'

import {isNotNil} from '../util'

export const propExists = propSatisfies(isNotNil)
