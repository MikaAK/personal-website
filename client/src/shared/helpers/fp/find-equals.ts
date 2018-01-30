import {find, equals, curry} from 'ramda'

export const findEquals = curry((equalsValue: any, collection: any[]) => find(equals(equalsValue), collection))
