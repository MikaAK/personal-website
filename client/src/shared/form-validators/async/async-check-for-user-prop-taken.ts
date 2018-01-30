import {Apollo} from 'apollo-angular'
import {AbstractControl} from '@angular/forms'
import {map as rxMap, switchMap as rxSwitchMap, catchError} from 'rxjs/operators'
import {of as rxOf} from 'rxjs/observable/of'
import {Observable} from 'rxjs/Observable'
import {timer as rxTimer} from 'rxjs/observable/timer'
import {always, path, compose, head, ifElse} from 'ramda'

import {noop, isPOJO} from '../../helpers/util'

import * as checkForUserQuery from './async-check-for-user.query.graphql'

const getControlName = (control: AbstractControl) => {
  const controlTuple = Object.entries(control.parent.controls)
    .find(([, pControl]) => pControl === control)

  if (controlTuple)
    return head(controlTuple)
  else
    throw new Error('Control must be a part of a FormGroup and be keyed under a User property to use this validation')
}

export const queryForUser = (apollo: Apollo, valueTransformer?: (val: any) => any) => {
  return (control: AbstractControl) => apollo.query({
    query: checkForUserQuery,
    variables: {[getControlName(control)]: valueTransformer ? valueTransformer(control.value) : control.value}
  })
    .pipe(rxMap(path(['data', 'accountUser'])))
}

const DEBOUNCE_TIMEOUT = 300

export const asyncCheckUserPropNotTaken = (apollo: Apollo, valueTransformer?: (val: any) => any) => {
  return (control: AbstractControl) => rxTimer(DEBOUNCE_TIMEOUT)
    .pipe(
      rxSwitchMap(() => queryForUser(apollo, valueTransformer)(control)),
      rxMap(always({[`${getControlName(control)}Taken`]: true})),
      catchError(compose(rxOf, noop))
    )
}

const isErrored = isPOJO

type PropTakenError = {[key: string]: boolean} | undefined

export const asyncCheckUserPropTaken = (
  apollo: Apollo,
  valueTransformer?: (val: any) => any
) => (control: AbstractControl): Observable<PropTakenError> => {
  return asyncCheckUserPropNotTaken(apollo, valueTransformer)(control)
    .pipe(rxMap(ifElse(isErrored, noop, always({[`${getControlName(control)}NotInUse`]: true}))))
}
