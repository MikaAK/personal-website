import {Component, HostBinding} from '@angular/core'
import {trigger, transition, query, style, stagger, animate} from '@angular/animations'

const ANIMATION_TIME = 375

@Component({
  selector: 'mk-services',
  templateUrl: './services.component.pug',
  styleUrls: ['./services.component.scss'],
  animations: [
    trigger('serviceCardAnimation', [
      transition('* => *', [
        query('mat-card', [
          style({opacity: 0, transform: 'translateY(-20%)'}),

          stagger(ANIMATION_TIME * .5, [
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
export class ServicesComponent {
  @HostBinding('@serviceCardAnimation') public isInView = false

  public onEleInView() {
    this.isInView = true
  }
}
