import {Component, OnInit, OnDestroy} from '@angular/core'
import {Router, RouterEvent} from '@angular/router'
import {filter as rxFilter, skip} from 'rxjs/operators'
import {Subscription} from 'rxjs/Subscription'
import {is} from 'ramda'

const SKIP_FOR_ON_LOAD = 1

@Component({
  selector: 'mk-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private sub: Subscription

  constructor(private router: Router) { }

  public ngOnInit() {
    this.sub = this.router.events.pipe(
      rxFilter(is(RouterEvent)),
      skip(SKIP_FOR_ON_LOAD)
    )
      .subscribe(() => window.scrollTo(0, 0))
  }

  public ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe()
  }
}
