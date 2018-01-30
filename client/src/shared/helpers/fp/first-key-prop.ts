import {prop, compose, keys, identity, converge} from 'ramda'

export const firstKeyProp = converge(prop, [
  compose(([firstKey]) => firstKey, keys),
  identity
])
