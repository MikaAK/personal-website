import {tap, toString, compose} from 'ramda'

const debugMessage = (msg: string) => (item: any) => {
  const log = msg ? [msg] : []

  if (item && typeof item.inspect === 'function')
    log.push(item.inspect())
  else if (typeof item === 'object')
    log.push(item)
  else
    log.push(toString(item))

  console.log(...log)  // tslint:disable-line
}

export const debug = tap(debugMessage(''))
export const debugMsg = (msg: string) => tap((item) => debugMessage(msg)(item))
export const debugFunc = (func: any) => compose(debugMsg('After: '), func, debugMsg('Before: '))
