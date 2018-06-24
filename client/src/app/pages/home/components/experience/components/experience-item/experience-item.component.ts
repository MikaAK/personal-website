import {Component, Input, OnDestroy} from '@angular/core'
import {MediaChange, ObservableMedia} from '@angular/flex-layout'
import {DomSanitizer, SafeHtml} from '@angular/platform-browser'
import {Subscription} from 'rxjs'

@Component({
  selector: 'mk-experience-item',
  templateUrl: './experience-item.component.pug',
  styleUrls: ['./experience-item.component.scss']
})
export class ExperienceItemComponent implements OnDestroy {
  @Input() public title: string
  @Input() public date: string
  @Input() public direction: 'left' | 'right' = 'left'
  @Input() public hideTail = false
  @Input() public set content(val: string) {
    this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(val)
  }

  public isMobile = false
  public isExtraSmall = false
  public sub: Subscription

  public sanitizedContent: SafeHtml

  public get currentDirection() {
    return this.isMobile ? 'right' : this.direction
  }

  public get isDirectionLeft() {
    return this.currentDirection === 'left'
  }

  public get isDirectionRight() {
    return this.currentDirection === 'right'
  }

  public get viewBoxPath() {
    const length = this.isExtraSmall ? '230' : '260'
    // const width = this.isMobile ? '250' : '114'

    return `0 0 ${length} 114`
  }

  public get rightArmPath() {
    const length = this.isExtraSmall ? '230' : '260'

    return `M157 25l30.806-24H${length}`
  }

  constructor(private media: ObservableMedia, private sanitizer: DomSanitizer) {
    this.sub = this.media.subscribe((change: MediaChange) => {
      this.isMobile = change.mqAlias === 'xs' || change.mqAlias === 'sm'
      this.isExtraSmall = change.mqAlias === 'xs'
    })
  }

  public ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
