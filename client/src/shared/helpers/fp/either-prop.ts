import {curry} from 'ramda'

export const eitherProp = curry<
  string,
  string,
  {[key: string]: any},
  any
>((prop1, prop2, item) => item[prop1] || item[prop2])
