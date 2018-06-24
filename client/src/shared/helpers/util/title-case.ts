import * as words from 'lodash.words'
import {
  compose, join, map,
  toLower, toUpper, head,
  tail, converge, concat
} from 'ramda'

const titleCaseWord = converge(concat, [
  compose(toUpper, head),
  compose(toLower, tail)
])

const joinLowerWords = compose(join(' '), map(titleCaseWord))

export const titleCase = compose(joinLowerWords, words)
