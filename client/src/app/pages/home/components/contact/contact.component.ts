import {Component} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {catchError, mapTo as rxMapTo} from 'rxjs/operators'
import {of as rxOf} from 'rxjs/observable/of'

import {ContactService} from './contact.service'

export type ContactInfo = {
  name: string
  email: string
  message: string
}

@Component({
  selector: 'mk-contact',
  templateUrl: './contact.component.pug',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public isSendingEmail = false
  public didSendEmail = false
  public contactGroup = this.fb.group({
    name: ['', {validators: [Validators.required]}],
    email: ['', {validators: [Validators.required, Validators.email]}],
    message: ['', {validators: [Validators.required]}]
  })

  public get email() {
    return this.contactGroup.get('email')
  }

  public get name() {
    return this.contactGroup.get('name')
  }

  public get message() {
    return this.contactGroup.get('message')
  }

  public get emailErrorMessage() {
    if (!this.email || !this.email.errors)
      return ''
    else if (this.email.errors.required)
      return 'Email is required'

    else if (this.email.errors.email)
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
}
