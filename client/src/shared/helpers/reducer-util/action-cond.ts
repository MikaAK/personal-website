import {curry, pick} from 'ramda'
import {StateActionTuple, ActionCondMap} from './metadata'

export const condActionPayload = <T>([, action]: StateActionTuple<any, T>): T => action.payload
export const condState = <S>([state]: StateActionTuple<S, any>): S => state
export const condAction = <T>([, action]: StateActionTuple<any, T>): PayloadAction<T> => action

export const condActionPayloadProps = <T>(props: string[]) => {
  return ([, action]: StateActionTuple<any, T>) => {
    return pick(props, action.payload)
  }
}

export const condActionPayloadProp = curry(<T, S = any>(
  propName: string,
  [, action]: StateActionTuple<S, T>
): T | null => {
  const payload: {[key: string]: any} & T | undefined = action.payload

  if (payload && payload[propName])
    return payload[propName]
  else
    return null
})

export const actionCond = <S, T = (any | S)>(
  conditions: ActionCondMap<S, T>,
  initialStateFun?: () => S
) => {
  return (state: S, action: PayloadAction<T>) => {
    const condRunner = conditions.find(([actionType]) => actionType === action.type)

    if (condRunner) {
      const stateFun = condRunner[1]

      return stateFun([state, action])
    } else if (state) {
      return state
    } else {
      return initialStateFun ? initialStateFun() : state
    }
  }
}
