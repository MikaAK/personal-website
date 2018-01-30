import {compose} from 'ramda'

import {mergeToState} from './merge-to-state'
import {condActionPayload} from './action-cond'

export const mergeActionPayloadTransformToState = <S, T>(fn: (actionPayload: T) => S) => mergeToState<S, T>(
  compose(fn, condActionPayload)
)
