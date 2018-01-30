export const whenTrue = <T = any>(fun: (a?: boolean) => T) => (val: any) => {
  if (!!val)
    return fun(val)
  else
    return val
}
