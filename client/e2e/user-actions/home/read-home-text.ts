import {compose, curryN} from 'ramda'

import {byCss, getElementText} from '../../helpers'

export const readHomeText = curryN(0, compose(getElementText, byCss('sc-root h1')))
