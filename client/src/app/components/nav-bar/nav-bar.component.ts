import {Component, HostListener} from '@angular/core'
import {trigger, state, style, sequence, transition, animate} from '@angular/animations'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'
import {map as rxMap, distinctUntilChanged} from 'rxjs/operators'

import {scrollToElementId} from '../../../shared/helpers/ui'
import {environment}  from '../../../environments/environment'

const NAVBAR_HEIGHT = environment.navbarHeight
const ANIMATION_TIME = 400

const isMobile = () => window.innerWidth <= 650
const isPastNavbarTop = (scrollTop: number) => scrollTop > NAVBAR_HEIGHT

@Component({
  selector: 'mk-nav-bar',
  templateUrl: './nav-bar.component.pug',
  animations: [
    trigger('navBarFixed', [
      state('absolute', style({position: 'absolute', opacity: 1})),
      state('fixed', style({position: 'fixed', opacity: 1})),

      transition('absolute => fixed', sequence([
        style({position: 'fixed', opacity: 0}),
        animate(ANIMATION_TIME, style({opacity: 1}))
      ]))
    ])
  ]
})
export class NavBarComponent {
  public navBarState: Observable<'fixed'|'absolute'>
  private scrollPosition = new BehaviorSubject<number>(window.scrollY)

  constructor() {
    this.navBarState = this.scrollPosition
      .asObservable()
      .pipe(
        rxMap((scrollPosition) => isPastNavbarTop(scrollPosition)),
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
