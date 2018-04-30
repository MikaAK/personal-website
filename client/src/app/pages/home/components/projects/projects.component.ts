import {Component, HostBinding, AfterViewInit} from '@angular/core'
import {trigger, transition, query, style, stagger, animate} from '@angular/animations'
import {compose, prop} from 'ramda'

import * as projectCards from './project-cards.json'

const ANIMATION_TIME = 425

const constructImage = (url: string) => import('idle-promise')
  .then((idlePromise) => idlePromise())
  .then(() => {
    const img = new Image()

    img.src = url

    return img
  })

const createImageFromUrl = compose(constructImage, prop('imageUrl'))
const preloadImages = () => projectCards.forEach(createImageFromUrl)

@Component({
  selector: 'mk-projects',
  templateUrl: './projects.component.pug',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('projectCardAnimation', [
      transition('* => *', [
        query('mk-project-card', [
          style({opacity: 0, transform: 'translateY(-10%)'}),

          stagger(ANIMATION_TIME * 0.5, [
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
export class ProjectsComponent implements AfterViewInit {
  public projectCards = projectCards
  @HostBinding('@projectCardAnimation') public isInView = false

  public onEleInView() {
    this.isInView = true
  }

  public ngAfterViewInit() {
    preloadImages()
  }
}
