import {useWith, over, ifElse, lensPath, lensIndex, lensProp, identity} from 'ramda'

import {isNumber} from '../util/is-number'

export const overProp = useWith(over, [ifElse(isNumber, lensIndex, lensProp), identity, identity])
export const overPath = useWith(over, [lensPath, identity, identity])
