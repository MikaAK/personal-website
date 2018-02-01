import {Component} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'

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
  public contactGroup = this.fb.group({
    name: ['', {updateOn: 'submit', validators: [Validators.required]}],
    email: ['', {updateOn: 'submit', validators: [Validators.required, Validators.email]}],
    message: ['', {updateOn: 'submit', validators: [Validators.required]}]
  })

  constructor(private fb: FormBuilder) { }

  public onSubmit(data: ContactInfo) {
    console.log(data) // tslint:disable-line no-conosle
  }
}
