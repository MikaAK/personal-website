import {reject, propEq, curry} from 'ramda'

export const rejectPropEq = curry((prop: string, equalsValue: any, collection: any[]) => {
  return reject(propEq(prop, equalsValue), collection)
})
