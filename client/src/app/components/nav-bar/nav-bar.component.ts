import {Component, HostListener} from '@angular/core'
import {trigger, state, style, sequence, transition, animate} from '@angular/animations'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'
import {map as rxMap, distinctUntilChanged} from 'rxjs/operators'

import {scrollToElementId} from '../../../shared/helpers/ui'
import {environment} from '../../../environments/environment'

const NAVBAR_HEIGHT = environment.navbarHeight
const ANIMATION_TIME = 400
const MOBILE_WIDTH = 650
const TRANSPARENT_BACKGROUND = 'transparent'
const DARK_BLUE_BACKGROUND = '#1F1F1F'

const isMobile = () => window.innerWidth <= MOBILE_WIDTH
const isPastNavbarTop = (scrollTop: number) => scrollTop > NAVBAR_HEIGHT

@Component({
  selector: 'mk-nav-bar',
  templateUrl: './nav-bar.component.pug',
  styles: ['mat-toolbar { padding: 0 1.5rem; }'], // tslint:disable-line no-unused-css
  animations: [
    trigger('navBarFixed', [
      state('absolute', style({position: 'absolute', backgroundColor: TRANSPARENT_BACKGROUND})),
      state('fixed', style({position: 'fixed', backgroundColor: DARK_BLUE_BACKGROUND, opacity: 1})),

      transition('* => fixed', sequence([
        style({position: 'fixed', backgroundColor: TRANSPARENT_BACKGROUND, opacity: 0}),
        animate(ANIMATION_TIME, style({backgroundColor: DARK_BLUE_BACKGROUND, opacity: 1}))
      ])),

      transition('* => absolute', sequence([
        style({position: 'fixed', backgroundColor: DARK_BLUE_BACKGROUND}),
        animate(ANIMATION_TIME, style({backgroundColor: TRANSPARENT_BACKGROUND})),
        style({position: 'absolute'})
      ]))
    ])
  ]
})
export class NavBarComponent {
  public navBarState: Observable<'fixed' | 'absolute'>
  private scrollPosition = new BehaviorSubject<number>(window.scrollY)

  constructor() {
    this.navBarState = this.scrollPosition
      .asObservable()
      .pipe(
        rxMap(isPastNavbarTop),
        distinctUntilChanged(),
        rxMap((isPastTop) => isMobile() || isPastTop ? 'fixed' : 'absolute')
      )
  }

  @HostListener('window:scroll', ['$event.currentTarget.scrollY'])
  public handleScroll(scrollPos: number) {
    this.scrollPosition.next(scrollPos)
  }

  public scrollTo(target: string) {
    if (target === 'home')
      window.scroll({top: 0, left: 0, behavior: 'smooth'})
    else
      scrollToElementId(target)
  }
}
