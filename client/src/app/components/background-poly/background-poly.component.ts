import {Component, Input, HostListener, ElementRef, ViewChild, AfterViewInit} from '@angular/core'

const DEFAULT_TOP_RIGHT_POS = 0
const DEFAULT_TOP_LEFT_POS = 200
const DEFAULT_BOTTOM_LEFT_POS = -200
const SMALL_SCREEN_WIDTH = 880
const MEDIUM_SCREEN_WIDTH = 1310

@Component({
  selector: 'mk-background-poly',
  templateUrl: './background-poly.component.pug',
  styles: [`:host[reversed] svg { transform: rotate(180deg); }`]
})
export class BackgroundPolyComponent implements AfterViewInit {
  @Input() public color = '#F5F5F5'
  @Input() public topRightModifier = 0
  @Input() public topLeftModifier = 0
  @Input() public bottomRightModifier = 0
  @Input() public bottomLeftModifier = 0
  @Input() public heightModifier = 100

  @ViewChild('container') public container: ElementRef

  public get viewBox() {
    return `0 0 ${this._viewBoxWidth} ${this.viewBoxHeight}`
  }

  public get viewBoxHeight() {
    return this._viewBoxHeight + this.heightModifier
  }

  public get bottomRightPosition() {
    return this.viewBoxHeight + this.bottomRightModifier
  }

  public get bottomLeftPosition() {
    let heightModifier

    if (this._viewBoxWidth <= SMALL_SCREEN_WIDTH)
      heightModifier = 1
    else
      heightModifier = this._viewBoxWidth >= MEDIUM_SCREEN_WIDTH ? 2 : 1.5

    return this.viewBoxHeight + Math.floor(DEFAULT_BOTTOM_LEFT_POS * heightModifier) + this.bottomLeftModifier
  }

  public get topRightPosition() {
    return DEFAULT_TOP_RIGHT_POS + this.topRightModifier
  }

  public get topLeftPosition() {
    const modifier = this._viewBoxWidth <= SMALL_SCREEN_WIDTH ? .50 : 1

    return Math.floor(modifier * DEFAULT_TOP_LEFT_POS) + this.topLeftModifier
  }

  public get path() {
    return `
      M${this.topRightPosition}
      ${this.topLeftPosition}v${this.bottomLeftPosition}
      L${this._viewBoxWidth} ${this.bottomRightPosition} ${this._viewBoxWidth}
      0z
    `
  }

  private _viewBoxWidth = window.innerWidth
  private _viewBoxHeight = 0

  @HostListener('window:resize', ['$event.currentTarget.innerWidth'])
  public viewBoxWidth(currentWidth: any) {
    this._viewBoxWidth = currentWidth
    this._viewBoxHeight = this.container.nativeElement.clientHeight
  }

  public ngAfterViewInit() {
    setTimeout(() => this._viewBoxHeight = this.container.nativeElement.clientHeight, 0)
  }
}
