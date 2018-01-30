import {merge} from 'ramda'

export const storeByKey = (idKey: string) => (items: any[]) => {
  return items.reduce((acc: {[key: string]: any}, item: any) => {
    const id: string = item[idKey]
    acc[id] = item

    return acc
  }, {})
}

export const updateByKey = (idProp: string) => {
  return (payload: any, state: {[key: string]: any}): {[key: string]: any} => merge(state, {
    [payload[idProp]]: payload
  })
}

export const storeById = storeByKey('id')
export const updateById = updateByKey('id')
