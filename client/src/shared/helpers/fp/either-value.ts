import {curry} from 'ramda'

export const eitherValue = curry(<T, V>(
  fn1: (a: T) => V,
  fn2: (a: T) => V,
  item: T
) => fn1(item) || fn2(item))
