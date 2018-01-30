import {curry, propIs} from 'ramda'

export const callProp = curry((prop: string, item: any) => {
  if (propIs(Function, prop, item))
    return item[prop]()
  else
    return null
})
