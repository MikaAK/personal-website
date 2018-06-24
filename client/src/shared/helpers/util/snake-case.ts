import * as words from 'lodash.words'
import {compose, join, map, toLower} from 'ramda'

const joinLowerWords = compose(join('_'), map(toLower))

export const snakeCase = compose(joinLowerWords, words)
