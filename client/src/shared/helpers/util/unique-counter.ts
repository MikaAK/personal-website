export const uniqueCounter = (transform?: (val: number) => any) => {
  let currentCounter = 0

  return (): number => transform ? transform(currentCounter++) : currentCounter++
}
