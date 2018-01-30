import {compose, lt, prop} from 'ramda'

export const queryListHasItems = compose(lt(0), prop('length'))
