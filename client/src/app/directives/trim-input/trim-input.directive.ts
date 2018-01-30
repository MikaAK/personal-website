import {Directive, HostListener, OnDestroy, OnInit} from '@angular/core'
import {NgControl} from '@angular/forms'
import {trim} from 'ramda'
import {Subject} from 'rxjs/Subject'
import {Subscription} from 'rxjs/Subscription'
import {debounceTime, map as rxMap} from 'rxjs/operators'

const DEBOUNCE_TIMEOUT = 300

@Directive({
  selector: '[mkTrimInput]'
})
export class TrimInputDirective implements OnDestroy, OnInit {
  private controlValue$ = new Subject<any>()
  private sub: Subscription

  constructor(private control: NgControl) { }

  public ngOnInit() {
    this.sub = this.controlValue$
      .pipe(debounceTime(DEBOUNCE_TIMEOUT), rxMap(trim))
      .subscribe((value) => {
        if (this.control.control)
          this.control.control.setValue(value)
      })
  }

  @HostListener('input')
  public onInput() {
    this.controlValue$.next(this.control.value)
  }

  public ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
