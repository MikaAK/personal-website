import {Input, Directive, Renderer2, HostListener, AfterViewInit, ElementRef} from '@angular/core'

const DEFAULT_HOVER_CLASS = 'hovered'

@Directive({
  selector: '[mkClassOnHover]'
})
export class ClassOnHoverDirective implements AfterViewInit {
  @Input() public mkClassOnHover: string
  @Input() public mkClassOffHover: string

  constructor(private renderer: Renderer2, private ele: ElementRef) { }

  public ngAfterViewInit() {
    if (this.mkClassOffHover)
      this.renderer.addClass(this.ele.nativeElement, this.mkClassOffHover)
  }

  @HostListener('mouseenter')
  public addClass() {
    if (this.mkClassOffHover)
      this.renderer.removeClass(this.ele.nativeElement, this.mkClassOffHover)

    this.renderer.addClass(this.ele.nativeElement, this.mkClassOnHover || DEFAULT_HOVER_CLASS)
  }

  @HostListener('mouseleave')
  public removeClass() {
    if (this.mkClassOffHover)
      this.renderer.addClass(this.ele.nativeElement, this.mkClassOffHover)

    this.renderer.removeClass(this.ele.nativeElement, this.mkClassOnHover || DEFAULT_HOVER_CLASS)
  }
}
