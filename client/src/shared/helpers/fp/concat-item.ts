import {curry} from 'ramda'

export const concatItem = curry((item: any, collection: any[]) => collection.concat(item))
