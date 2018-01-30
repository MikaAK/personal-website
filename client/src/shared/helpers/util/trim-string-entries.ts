import {when, trim} from 'ramda'

import {isString} from './is-string'

const trimIfString = when(isString, trim)

export const trimStringEntries = <T>(obj: object) => <T>Object.entries(obj)
  .reduce((acc: {[key: string]: any}, [key, value]: [string, any]) => {
    acc[key] = trimIfString(value)

    return acc
  }, {})
