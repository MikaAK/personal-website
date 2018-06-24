import {NgZone, Directive, ElementRef, Output, EventEmitter, AfterViewInit} from '@angular/core'

interface IIntersectionCallback {
  target: Element
  callback: Function
}

const callbacks: IIntersectionCallback[] = []

export const findCallback = (target: Element): IIntersectionCallback => {
  return <IIntersectionCallback>callbacks.find((callback) => callback.target === target)
}

export const isEntryVisible = (entry: IntersectionObserverEntry) => {
  return entry.intersectionRatio !== 0
}

export const observerCallback = (entries: IntersectionObserverEntry[], intObserver: IntersectionObserver) => {
  return entries
    .filter(isEntryVisible)
    .map((entry) => {
      const item: [IntersectionObserverEntry, IIntersectionCallback] = [
        entry,
        findCallback(entry.target)
      ]

      return item
    })
    .forEach(([entry, callbackStore]) => {
      callbackStore.callback(entry)
      intObserver.unobserve(entry.target)
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
  @Output('mkEleInView') public eleInView = new EventEmitter()

  constructor(private _ngZone: NgZone, private _ele: ElementRef) { }

  public ngAfterViewInit() {
    intersectionObserver(this._ele.nativeElement, () => {
      this._ngZone.run(() => {
        this.eleInView.emit()
      })
    })
  }
}
