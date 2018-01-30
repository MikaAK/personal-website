import {curry, propIs} from 'ramda'

export const callPropWith = curry((prop: string, value: any, item: any) => {
  if (propIs(Function, prop, item))
    return item[prop](value)
  else
    return null
})
