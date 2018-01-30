import {converge, merge} from 'ramda'

import {condState, condActionPayload} from './action-cond'

export const mergeActionPayloadToState = converge(merge, [condState, condActionPayload])
