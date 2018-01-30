import {contains, curry} from 'ramda'

export const includesIn = curry((items: any[], item: any) => contains(item, items))
