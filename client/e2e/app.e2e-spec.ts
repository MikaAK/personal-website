import * as assert from 'power-assert'

import {browser} from 'protractor'

import {navigateHome, readHomeText} from './user-actions'

describe('client App', () => {
  it('should display welcome message', () => {
    navigateHome()
    browser.pause()
    // assert(readHomeText() === 'Welcome to My App!'))
  })
})
