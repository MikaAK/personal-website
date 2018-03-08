import {NgZone, Directive, ElementRef, Output, EventEmitter} from '@angular/core'

interface IIntersectionCallback {
  target: Element
  callback: Function
}

const callbacks: IIntersectionCallback[] = []

export function findCallback(target: Element) {
  return callbacks.find((callback) => callback.target === target)
}

export function isEntryVisible(entry: IntersectionObserverEntry) {
  return entry.intersectionRatio !== 0
}

export function observerCallback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
  return entries
    .filter(isEntryVisible)
    .map((entry) => [entry, findCallback(entry.target)])
    .forEach(([entry, callbackStore]: [IntersectionObserverEntry, IIntersectionCallback]) => {
      callbackStore.callback(entry)
      observer.unobserve(entry.target)
    })
}

const observer = new IntersectionObserver(observerCallback, {threshold: .33})

export const intersectionObserver = (target: Element, callback: Function) => {
  callbacks.push({target, callback})
  observer.observe(target)
}

@Directive({
  selector: '[eleInView]'
})
export class EleInViewDirective {
  @Output() public eleInView = new EventEmitter()

  constructor(private _ngZone: NgZone, private _ele: ElementRef) { }

  public ngAfterViewInit() {
    intersectionObserver(this._ele.nativeElement, () => {
      this._ngZone.run(() => {
        this.eleInView.emit()
      })
    })
  }
}
