import {isObject} from './is-object'

export const isPOJO = (obj: any) => !!obj && !Array.isArray(obj) && isObject(obj)
