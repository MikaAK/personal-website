import {Component, Output, EventEmitter} from '@angular/core'

import {scrollToElementId} from '../../../../../shared/helpers/ui'

@Component({
  selector: 'mk-landing-intro',
  templateUrl: './landing-intro.component.pug'
})
export class LandingIntroComponent {
  @Output() public contactForRates = new EventEmitter<string>()

  public onClickToContact() {
    scrollToElementId('contact')
    this.contactForRates.emit('Hi,\n\nmy project is about ___')
  }

  public onScrollToClick(eleId: string) {
    scrollToElementId(eleId)
  }
}
