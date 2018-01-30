import {TestBed, async} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {RouterModule} from '@angular/router'
import * as td from 'testdouble'

import {AppComponent} from './app.component'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents()
  }))

  it('creates the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance

    assert(app)
  }))

  it('returns 42', () => {
    const testObject = {
      run: () => 1
    }

    const run = td.replace(testObject, 'run')

    const res = testObject.run()

    td.verify(run())
  })
})
