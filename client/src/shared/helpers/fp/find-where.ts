import {find, useWith, whereEq, identity} from 'ramda'

export const findWhere = useWith(find, [whereEq, identity])
