import {isNil, cond, is, T, F} from 'ramda'

const isArrayAnyTrue = (array: any[]) => array
  .some(anyTrue)

const isObjectAnyTrue = (obj: object) => Object.entries(obj)
  .some(([, value]) => anyTrue(value))

const coerceBoolean = (item: any) => !!item

export const anyTrue = cond([
  [isNil, F],
  [Array.isArray, isArrayAnyTrue],
  [is(Object), isObjectAnyTrue],
  [T, coerceBoolean]
])
