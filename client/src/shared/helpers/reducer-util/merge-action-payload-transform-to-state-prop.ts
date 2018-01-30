import {mergeToStateProp} from './merge-to-state-prop'

export const mergeActionPayloadTransformToStateProp = <S, T>(
  propName: keyof S,
  fn: (actionPayload: T
) => S[keyof S]) => {
  return mergeToStateProp<S, T>(propName, ([, {payload}]) => fn(payload))
}
