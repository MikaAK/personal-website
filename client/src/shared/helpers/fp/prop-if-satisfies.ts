export const propIfSatisfies = <T>(
  prop: keyof T,
  func: (itemProp: T[keyof T]) => boolean,
  defaultReturnFn?: (item: T) => any
) => (item: T) => {
  if (func(item[prop]))
    return item[prop]
  else if (defaultReturnFn)
    return defaultReturnFn(item)
  else
    return item
}
