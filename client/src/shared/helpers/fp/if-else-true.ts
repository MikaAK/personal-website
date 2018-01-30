export const ifElseTrue = <T>(ifTrue: (item?: true) => T, ifFalse: (item?: false) => T) => (value: any) => {
  if (value)
    return ifTrue(true)
  else
    return ifFalse(false)
}
