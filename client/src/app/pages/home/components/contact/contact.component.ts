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
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder) { }

  public onSubmit(data: ContactInfo) {
    console.log(data) // tslint:disable-line no-conosle
  }
}
