import {QueryList} from '@angular/core'
import {compose, lt} from 'ramda'

export const queryListHasItems = compose(
  lt(0),
  (queryList: QueryList<any>) => queryList.length
)
