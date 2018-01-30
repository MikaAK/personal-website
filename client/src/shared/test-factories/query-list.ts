import {QueryList} from '@angular/core'
import {always} from 'ramda'

export interface ITestQueryList<T> extends QueryList<T> {
  items: T[]
}

export const buildQueryList = <T>(items: T[]) => ({
  items,
  dirty: false,
  get length() {
    return items.length
  },
  toArray: always(items),
  forEach(fn: (item: T, index?: number) => any) {
    items.forEach(fn)
  }
} as ITestQueryList<T>)
