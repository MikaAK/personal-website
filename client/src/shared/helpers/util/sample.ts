import {compose, prop, converge, identity} from 'ramda'

import {randomNum} from './random-num'

export const sample = converge(prop, [
  compose(randomNum(1), prop('length')),
  identity
])
