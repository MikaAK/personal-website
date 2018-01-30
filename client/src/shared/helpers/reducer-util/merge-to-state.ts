import {merge} from 'ramda'

import {StateActionTuple, StateActionTupleFunction} from './metadata'

export const mergeToState = <S, T>(fn: StateActionTupleFunction<S, T>) => {
  return ([state, action]: StateActionTuple<S, T>) => merge(state, fn([state, action]))
}
