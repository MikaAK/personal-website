import {merge, applySpec, curry} from 'ramda'

type AddPropsType = <T>(spec: {[key: string]: Function}) => (data: object) => T

// Like applySpec but adds props to object
export const addProps: AddPropsType = curry((
  spec: {[key: string]: Function},
  data: object
) => merge(data, applySpec(spec)(data)))
