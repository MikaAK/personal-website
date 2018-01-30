import {curry} from 'ramda'

export const assocItem = curry((prop: string, value: any, item: any) => {
  item[prop] = value

  return item
})
