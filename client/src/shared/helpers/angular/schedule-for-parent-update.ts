import {curry} from 'ramda'

// This is used to schedule a parent update in angular,
// if you are changing a parent or child component property
// the zone will not know there is an update so you must force it
export const scheduleForParentUpdate = curry((fn: any, value: any) => Promise.resolve().then(() => fn(value)))
