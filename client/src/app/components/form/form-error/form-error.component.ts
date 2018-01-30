import {Component, Input} from '@angular/core'
import {trigger, style, transition, animate} from '@angular/animations'
import {pathOr, compose, split, flip} from 'ramda'

import * as errors from '../../../../form-errors.json'

const errorMessage = flip(pathOr(''))(errors)
export const codeMessage = compose<string, string[], string>(errorMessage, split('.'))

@Component({
  selector: 'mk-form-error',
  template: `
    <span @transitionMessages *ngIf='!isHidden' class='sc-error-message'>
      {{ message }}
    </span>
  `,
  styles: ['span {display: block; opacity: 1; transform: translateY(0);}'],
  animations: [
    trigger('transitionMessages', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-60%)'}),
        animate('300ms cubic-bezier(0.55, 0, 0.55, 0.2)', style({opacity: 1, transform: 'translateY(0)'})),
      ])
      // Leave transition isn't working for some reason
      // transition(':leave', [
      //   style({opacity: 1}),
      //   animate('1s ease-in-out', style({opacity: 0})),
      // ])
    ])
  ]
})
export class AppFormErrorComponent {
  @Input() public set code(val: string) {
    this.message = codeMessage(val)
  }

  @Input() public isHidden: boolean = true
  public message: string
}
