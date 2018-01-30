import {randomNum} from './random-num'

export const takeRandom = <T>(num: number, items: T[]): T[] => {
  const res = [],
        arrayOfItems = [...items]

  // tslint:disable-next-line no-parameter-reassignment
  while (num--) {
    const [randomItem] = arrayOfItems.splice(randomNum(1, arrayOfItems.length), 1)

    res.push(randomItem)
  }

  return res
}
