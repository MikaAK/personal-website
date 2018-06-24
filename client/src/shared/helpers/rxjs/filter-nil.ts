import {filter as rxFilter} from 'rxjs/operators'

import {isNotNil} from '../util'

export const rxFilterNil = rxFilter(isNotNil)
