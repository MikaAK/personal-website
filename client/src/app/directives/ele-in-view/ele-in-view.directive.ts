import {NgZone, Directive, ElementRef, Output, EventEmitter, AfterViewInit} from '@angular/core'

interface IIntersectionCallback {
  target: Element
  callback: Function
}

const callbacks: IIntersectionCallback[] = []

export const findCallback = (target: Element) => {
  return callbacks.find((callback) => callback.target === target)
}

export const isEntryVisible = (entry: IntersectionObserverEntry) => {
  return entry.intersectionRatio !== 0
}

export const observerCallback = (entries: IntersectionObserverEntry[], interObserver: IntersectionObserver) => {
  return entries
    .filter(isEntryVisible)
    .map((entry) => [entry, findCallback(entry.target)])
    .forEach(([entry, callbackStore]: [IntersectionObserverEntry, IIntersectionCallback]) => {
      callbackStore.callback(entry)
      interObserver.unobserve(entry.target)
    })
}

const observer = new IntersectionObserver(observerCallback, {rootMargin: '-200px 0px -200px 0px'})

export const intersectionObserver = (target: Element, callback: Function) => {
  callbacks.push({target, callback})
  observer.observe(target)
}

@Directive({
  selector: '[mkEleInView]'
})
export class EleInViewDirective implements AfterViewInit {
  @Output('mkEleInView') public eleInView = new EventEmitter() // tslint:disable-line no-output-rename

  constructor(private _ngZone: NgZone, private _ele: ElementRef) { }

  public ngAfterViewInit() {
    intersectionObserver(this._ele.nativeElement, () => {
      this._ngZone.run(() => {
        this.eleInView.emit()
      })
    })
  }
}
