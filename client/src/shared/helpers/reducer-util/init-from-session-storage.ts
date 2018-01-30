import {merge, prop} from 'ramda'

export const initFromSessionStorage = <S>(token: string, initItemFn?: () => S) => () => {
  const item = sessionStorage.getItem(`SC:${token}`) // We prepend the namespace we are using with angular-safeguard

  if (item && initItemFn)
    return merge(initItemFn(), prop('data', JSON.parse(item)))
  else if (item)
    return prop('data', JSON.parse(item))
  else if (initItemFn)
    return initItemFn()
  else
    return null
}
