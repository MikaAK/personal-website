import {compose, tail} from 'ramda'
import {QueryList} from '@angular/core'

import {callProp} from '../fp/call-prop'

export const queryListTail: <T>(items: QueryList<T | any>) => any = compose(tail, callProp('toArray'))
