import {
  ViewEncapsulation, QueryList,
  ContentChild, OnDestroy, AfterContentInit, Input,
  ChangeDetectionStrategy, Component, ContentChildren
} from '@angular/core'
import {MatFormFieldControl} from '@angular/material'
import {FormGroupDirective, NgControl, ControlContainer} from '@angular/forms'
import {Subscription} from 'rxjs/Subscription'
import {Observable} from 'rxjs/Observable'
import {map as rxMap, distinctUntilChanged, startWith, debounceTime, switchMap} from 'rxjs/operators'
import {of as rxOf} from 'rxjs/observable/of'
import {combineLatest} from 'rxjs/observable/combineLatest'
import {equals, ifElse, head} from 'ramda'

import {scheduleForParentUpdate} from '../../../../shared/helpers/angular'
import {assocItem} from '../../../../shared/helpers/fp'

import {AppFormErrorComponent} from '../form-error/form-error.component'
import {NoInputIdForFormField, NoInputForFormField} from './form-field.errors'

const ERROR_UPDATE_DEBOUCE = 100

const isPasswordInput = equals<string | undefined>('password')
const setFirstIndexVisible = (item: AppFormErrorComponent, index: number) => item.isHidden = index !== 0
const setHidden = assocItem('isHidden', true)
const isErrored = equals('INVALID')

const showFirstError = (list: QueryList<AppFormErrorComponent>) => () => list.forEach(setFirstIndexVisible)
const hideAllErrors = (list: QueryList<AppFormErrorComponent>) => () => list.forEach(setHidden)

// TODO: Fix error where validatons don't dissapear if error
// is fixed by input to another field
@Component({
  selector: 'mk-form-field',
  templateUrl: './form-field.component.pug',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None // tslint:disable-line use-view-encapsulation
})
export class AppFormFieldComponent implements AfterContentInit, OnDestroy {
  @ContentChild(MatFormFieldControl) public matFieldContentChild: MatFormFieldControl<any>
  @ContentChildren(AppFormErrorComponent) public formErrors: QueryList<AppFormErrorComponent>
  @Input() public label: string
  public inputId: string
  public isPasswordInput: boolean // will be used for password input viewer
  public sub: Subscription

  constructor(private controlContainer: ControlContainer) { }

  public ngAfterContentInit() {
    const hideOrShowError = ifElse(isErrored, showFirstError(this.formErrors), hideAllErrors(this.formErrors))

    if (!this.matFieldContentChild)
      throw new NoInputForFormField(this.label)

    if (!this.matFieldContentChild.id)
      throw new NoInputIdForFormField(this.label)

    this.inputId = this.matFieldContentChild.id
    this.isPasswordInput = isPasswordInput(this.matFieldContentChild.controlType)

    hideAllErrors(this.formErrors)

    this.sub = (<FormGroupDirective>this.controlContainer).ngSubmit
      .pipe(switchMap(() => this.observeErrorUpdates()))
      .subscribe(scheduleForParentUpdate(hideOrShowError))
  }

  public ngOnDestroy() {
    this.sub.unsubscribe()
  }

  private fieldContentChildStatusChanges(): Observable<string> {
    const fieldChild = this.matFieldContentChild

    if (fieldChild.ngControl && fieldChild.ngControl.statusChanges) {
      return fieldChild.ngControl.statusChanges
        .pipe(distinctUntilChanged())
    } else {
      return rxOf('VALID')
    }
  }

  private observeErrorUpdates() {
    const formErrors$ = this.formErrors.changes.pipe(
      startWith(this.formErrors.toArray())
    )

    const formStatusSource$ = this.fieldContentChildStatusChanges().pipe(
      startWith((<NgControl>this.matFieldContentChild.ngControl).status)
    )

    return combineLatest(formStatusSource$, formErrors$)
      .pipe(
        debounceTime(ERROR_UPDATE_DEBOUCE),
        rxMap<[string, AppFormErrorComponent[]], string>(head)
      )
  }
}
