import {NgModuleRef, ApplicationRef} from '@angular/core'
import {createNewHosts} from '@angularclass/hmr'

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
  let ngModule: NgModuleRef<any>

  module.hot.accept()

  bootstrap()
    .then((mod) => ngModule = mod)
    .catch((err) => {
      console.error(err) // tslint:disable-line no-console
      throw err
    })

  module.hot.dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef)
    const elements = appRef.components.map((comp) => comp.location.nativeElement)
    const makeVisible = createNewHosts(elements)

    ngModule.destroy()
    makeVisible()
  })
}
