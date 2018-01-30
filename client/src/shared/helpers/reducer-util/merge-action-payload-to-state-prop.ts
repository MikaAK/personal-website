import {mergeToStateProp} from './merge-to-state-prop'

export const mergeActionPayloadToStateProp = <S>(propName: keyof S) => {
  return mergeToStateProp<S, any>(propName, ([, {payload}]) => payload)
}
