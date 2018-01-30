import * as words from 'lodash.words'
import {compose, join, map, toLower} from 'ramda'

const joinLowerWords = compose(join('-'), map(toLower))

export const kebabCase = compose(joinLowerWords, words)
