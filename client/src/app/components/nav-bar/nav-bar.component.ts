import {Component, HostListener} from '@angular/core'
import {trigger, state, style, sequence, transition, animate} from '@angular/animations'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {Observable} from 'rxjs/Observable'
import {map as rxMap, distinctUntilChanged} from 'rxjs/operators'

const NAVBAR_HEIGHT = 64
const ANIMATION_TIME = 400

@Component({
  selector: 'mk-nav-bar',
  templateUrl: './nav-bar.component.pug',
  styleUrls: ['./nav-bar.component.scss'],
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
        rxMap((scrollPosition) => this._isPastTopPageNavbar(scrollPosition)),
        distinctUntilChanged(),
        rxMap((isPastTop) => this._isInMobileLayout() || isPastTop ? 'fixed' : 'absolute')
      )
  }

  @HostListener('window:scroll', ['$event.currentTarget.scrollY'])
  public handleScroll(scrollPos: number) {
    this.scrollPosition.next(scrollPos)
  }

  private _isInMobileLayout() {
    return window.innerWidth <= 650
  }

  private _isPastTopPageNavbar(scrollTop: number): boolean {
      return scrollTop > NAVBAR_HEIGHT
  }
}
