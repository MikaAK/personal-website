import {Component, HostBinding} from '@angular/core'
import {trigger, transition, query, style, stagger, animate} from '@angular/animations'

import * as projectCards from './project-cards.json'

const ANIMATION_TIME = 300

@Component({
  selector: 'mk-projects',
  templateUrl: './projects.component.pug',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('projectCardAnimation', [
      transition('* => *', [
        query('mk-project-card', [
          style({opacity: 0, transform: 'translateY(-20%)'}),

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
export class ProjectsComponent {
  public projectCards = projectCards
  @HostBinding('@projectCardAnimation') public isInView = false

  public onEleInView() {
    this.isInView = true
  }
}
