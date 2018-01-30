import {codeMessage} from './form-error.component'

import * as errors from '../../../../form-errors.json'

describe('AppFormErrorComponent', () => {
  describe('Global Methods', () => {
    test('#codeMessage splits a error code and finds it from the form-errors.json', () => {
      assert(errors.AGE.REQUIRED === codeMessage('AGE.REQUIRED'))
    })
  })
})
