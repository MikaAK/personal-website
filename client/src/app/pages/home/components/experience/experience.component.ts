import {Component} from '@angular/core'
import {query, transition, trigger, animate, style, stagger, group} from '@angular/animations'

import * as experienceItems from './experience-items.json'

// Stagger seems to pre calculate this in AOT so it doesn't actually work
const isMobile = false // window.innerWidth < 550
const ANIMATION_LINE_DOWN_TIME = isMobile ? 0 : 300
const ANIMATION_BOUNCE_TIME = isMobile ? 0 : 200
const DRAW_ANIMATION_TIME = 200
const STEP_TIME = (ANIMATION_BOUNCE_TIME / 2) + ANIMATION_LINE_DOWN_TIME

@Component({
  selector: 'mk-experience',
  templateUrl: './experience.component.pug',
  styles: ['.experience_container { min-height: 995px; }'],
  animations: [
    trigger('animationRunning', [
      transition('false => true', [
        query('.experience-item_line-down', [style({strokeDashoffset: 73})], {optional: true}),
        query('.experience-item_circle-inner, .experience-item_circle-outer', [style({transform: 'scale(0)'})]),
        query('.experience-item_arm-left, .experience-item_arm-right', [style({strokeDashoffset: 111})], {optional: true}),
        query('.mat-card', [style({opacity: 0})], {optional: true}),

        query('mk-experience-item', [
          stagger(isMobile ? DRAW_ANIMATION_TIME : STEP_TIME, [
            group([
              query('.experience-item_circle-inner, .experience-item_circle-outer', [
                animate(`${ANIMATION_BOUNCE_TIME / 2}ms cubic-bezier(0.0, 0.0, 0.2, 1)`, style({
                  transform: 'scale(1.2)'
                })),

                animate(ANIMATION_BOUNCE_TIME, style({
                  transform: 'scale(1)'
                }))
              ]),

              group([
                query('.experience-item_line-down', [
                  animate(ANIMATION_LINE_DOWN_TIME, style({
                    strokeDashoffset: 0
                  }))
                ], {optional: true}),

                query('.experience-item_arm-left, .experience-item_arm-right', [
                  stagger(isMobile ? 0 : DRAW_ANIMATION_TIME, [
                    animate(`${DRAW_ANIMATION_TIME}ms cubic-bezier(0.4, 0.0, 0.6, 1)`, style({strokeDashoffset: 0}))
                  ])
                ], {optional: true}),

                query('.mat-card', [
                  stagger(DRAW_ANIMATION_TIME, [
                    animate(DRAW_ANIMATION_TIME, style({opacity: 1}))
                  ])
                ], {optional: true})
              ])
            ])
          ])
        ])
      ])
    ])
  ]
})
export class ExperienceComponent {
  public animationRunning = false
  public experienceItems = experienceItems

  public onEleInView() {
    this.animationRunning = true
  }
}
