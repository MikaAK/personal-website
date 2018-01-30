import {merge, objOf} from 'ramda'

import {StateActionTupleFunction, StateActionTuple} from './metadata'

export const mergeToStateProp = <S, T>(propName: keyof S, fn: StateActionTupleFunction<S, T, S[keyof S]>) => {
  return ([state, action]: StateActionTuple<S, T>) => merge(state, objOf(propName, fn([state, action])))
}
