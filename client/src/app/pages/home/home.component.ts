import {Component} from '@angular/core'

@Component({
  selector: 'mk-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public contactMessagePrefill: string

  public onContactForRates(message: string) {
    this.contactMessagePrefill = message
  }
}
