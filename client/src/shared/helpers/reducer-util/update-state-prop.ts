import {assoc} from 'ramda'

import {StateActionTuple} from './metadata'

export const updateStateProp = <S, T>(prop: keyof S, fn: (payload: T, state: S) => S[keyof S]) => {
  return ([state, {payload}]: StateActionTuple<S, T>) => assoc(prop, fn(payload, state), state)
}
