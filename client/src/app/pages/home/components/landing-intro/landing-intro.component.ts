import {Component, Output, EventEmitter} from '@angular/core'

import {scrollToElementId} from '../../../../../shared/helpers/ui'

@Component({
  selector: 'mk-landing-intro',
  templateUrl: './landing-intro.component.pug',
  styleUrls: ['./landing-intro.component.scss']
})
export class LandingIntroComponent {
  @Output() contactForRates = new EventEmitter<string>()
  public isAcceptingContracts = true

  public onClickToContact() {
    scrollToElementId('contact')
    this.contactForRates.emit('Hi,\n\nI have a project about ___ requiring ___ features, what would your rates be?')
  }

  public onScrollToClick(eleId: string) {
    scrollToElementId(eleId)
  }
}
