import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {NgModule} from '@angular/core'
import {HttpClientModule} from '@angular/common/http'
import {RouterModule, PreloadAllModules} from '@angular/router'
import {ServiceWorkerModule} from '@angular/service-worker'
import {FlexLayoutModule} from '@angular/flex-layout'
// import {StoreModule} from '@ngrx/store'
// import {EffectsModule} from '@ngrx/effects'
// import {StoreDevtoolsModule, StoreDevtoolsConfig} from '@ngrx/store-devtools'
// import {ApolloLink, concat as apolloConcat} from 'apollo-link'
// import {ApolloModule, Apollo} from 'apollo-angular'
// import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http'
// import {InMemoryCache} from 'apollo-cache-inmemory'
// import {LockerModule, DRIVERS.SESSION} from 'angular-safeguard'

import {environment} from '../environments/environment'

import {NavBarModule} from './components/nav-bar'
import {CopyFooterModule} from './components/copy-footer'

import {AppComponent} from './app.component'
import {routes} from './app.routes'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CopyFooterModule,
    NavBarModule,
    BrowserModule,
    FlexLayoutModule,
    // ApolloModule,
    // HttpLinkModule,
    HttpClientModule,
    // EffectsModule.forRoot([]),
    // StoreModule.forRoot({}),
    // StoreDevtoolsModule.instrument(<Partial<StoreDevtoolsConfig>>{name: 'Samacare Store Devtools'}),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    // LockerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(
  //   apollo: Apollo,
  //   httpLink: HttpLink,
  //   locker: Locker
  // ) {
  //   const http = httpLink.create({uri: environment.graphqlUrl})
  //   const authMiddleware = new ApolloLink((operation, forward) => {
  //     operation.setContext({
  //       headers: {
  //         Authorization: `Bearer ${locker.get(DRIVERS.SESSION, 'authToken')}`
  //       }
  //     })

  //     if (forward)
  //       return forward(operation)
  //     else
  //       return null
  //   })

  //   apollo.create({
  //     link: apolloConcat(authMiddleware, http),
  //     cache: new InMemoryCache()
  //   })
  // }
}
