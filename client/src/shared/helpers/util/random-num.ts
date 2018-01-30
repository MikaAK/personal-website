import {curry} from 'ramda'

// Random number between x, y inclusive
export const randomNum = curry((min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min))
