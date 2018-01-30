import {reject, equals, curry} from 'ramda'

export const rejectEquals = curry((equalsValue: any, collection: any[]) => reject(equals(equalsValue), collection))
