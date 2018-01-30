import {curry} from 'ramda'

export const setItemProp = curry((item: any, prop: string, value: any) => {
  item[prop] = value

  return item
})
