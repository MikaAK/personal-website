import {Component} from '@angular/core'

@Component({
  selector: 'mk-home',
  templateUrl: './home.component.pug'
})
export class HomeComponent {
  public contactMessagePrefill: string

  public onContactForRates(message: string) {
    this.contactMessagePrefill = message
  }
}
