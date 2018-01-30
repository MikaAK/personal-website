import {curry} from 'ramda'

export const findIn = curry((items: any[], fun: (item: any) => boolean) => items.find(fun))
