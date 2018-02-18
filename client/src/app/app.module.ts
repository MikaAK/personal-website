import {NgModule, APP_INITIALIZER} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {HttpClientModule} from '@angular/common/http'
import {RouterModule, PreloadAllModules} from '@angular/router'
import {ServiceWorkerModule} from '@angular/service-worker'
import {FlexLayoutModule} from '@angular/flex-layout'

import {environment} from '../environments/environment'

import {NavBarModule} from './components/nav-bar'
import {CopyFooterModule} from './components/copy-footer'

import {AppComponent} from './app.component'
import {routes} from './app.routes'
import {loadFonts} from './load-fonts'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CopyFooterModule,
    NavBarModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [{provide: APP_INITIALIZER, useFactory: loadFonts, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
