import {Component, HostBinding, Input} from '@angular/core'
import {trigger, transition, query, style, stagger, animate} from '@angular/animations'
import {FormBuilder, Validators} from '@angular/forms'
import {catchError, mapTo as rxMapTo} from 'rxjs/operators'
import {of as rxOf} from 'rxjs'

import {ContactService} from './contact.service'

export type ContactInfo = {
  name: string
  email: string
  message: string
}

const ANIMATION_TIME = 750

@Component({
  selector: 'mk-contact',
  templateUrl: './contact.component.pug',
  styles: ['.contact_container { min-height: 405px; }'], // tslint:disable-line no-unused-css
  animations: [
    trigger('contactAnimation', [
      transition('* => *', [
        query('mat-card', [
          style({opacity: 0, transform: 'translateY(40%)'}),

          stagger(ANIMATION_TIME * 1.25, [
            animate(`${ANIMATION_TIME}ms cubic-bezier(0.0, 0.0, 0.2, 1)`, style({
              opacity: 1,
              transform: 'translateY(0)'
            }))
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class ContactComponent {
  @HostBinding('@contactAnimation') public isInView = false

  @Input() public set email(val: string) {
    if (this.emailControl)
      this.emailControl.setValue(val)
  }

  @Input() public set name(val: string) {
    if (this.nameControl)
      this.nameControl.setValue(val)
  }

  @Input() public set message(val: string) {
    if (this.messageControl)
      this.messageControl.setValue(val)
  }

  public isSendingEmail = false
  public didSendEmail = false
  public contactGroup = this.fb.group({
    name: ['', {validators: [Validators.required]}],
    email: ['', {validators: [Validators.required, Validators.email]}],
    message: ['', {validators: [Validators.required]}]
  })

  public get emailControl() {
    return this.contactGroup.get('email')
  }

  public get nameControl() {
    return this.contactGroup.get('name')
  }

  public get messageControl() {
    return this.contactGroup.get('message')
  }

  public get emailErrorMessage() {
    if (!this.emailControl || !this.emailControl.errors)
      return ''
    else if (this.emailControl.errors.required)
      return 'Email is required'

    else if (this.emailControl.errors.email)
      return 'Email is invalid'
  }

  constructor(private fb: FormBuilder, private contact: ContactService) { }

  public onSubmit(data: ContactInfo) {
    if (this.contactGroup.valid) {
      this.isSendingEmail = true

      this.contact.sendEmail({
        senderEmail: data.email,
        senderName: data.name,
        message: data.message
      })
        .pipe(rxMapTo(true), catchError(() => rxOf(false)))
        .subscribe((didSendEmail: boolean) => {
          this.isSendingEmail = false
          this.didSendEmail = didSendEmail
        })
    }
  }

  public onEleInView() {
    this.isInView = true
  }
}
