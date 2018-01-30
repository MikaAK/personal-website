import {switchMap, tap as rxTap, take as rxTake} from 'rxjs/operators'
import {Observable} from 'rxjs/Observable'
import {Store, MemoizedSelector} from '@ngrx/store'
import {Locker, DRIVERS} from 'angular-safeguard'

import {AppState} from '../../../app/models'

export type EffectSaveConfig = {
  selector: keyof AppState | MemoizedSelector<object, any>
  store: Store<AppState>
  locker: Locker
  drivers: DRIVERS
  key: string
}

export const saveStateToStorage = (config: EffectSaveConfig) => (observable: Observable<any>) => observable
  .pipe(
    switchMap(() => config.store.select(<keyof AppState>config.selector).pipe(rxTake(1))),
    rxTap((state) => config.locker.set(config.drivers, config.key, state))
  )
