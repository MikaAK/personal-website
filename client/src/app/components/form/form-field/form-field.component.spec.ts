// import {async} from '@angular/core/testing'
// import {partition, prop} from 'ramda'

// import {buildQueryList, TestQueryList} from '../../../../shared/test-factories'

// import {showOnlyFirstError, hideAllErrors} from './form-field.component'

// type TestQueryTuple = [TestQueryList<any>, boolean]

// const partitionHidden = ([{items}]: TestQueryTuple) => partition(prop('isHidden'), items)
// const createTestQueryList = (isHidden: boolean) => buildQueryList(Array(3).fill(1).map(() => ({isHidden})))
// const createTestData = (isHidden = false): TestQueryTuple => ([createTestQueryList(isHidden), false])

// describe('AppFormFieldComponent', () => {
//   describe('Global Methods', () => {
//     test('#showOnlyFirstError sets isHidden to false on first and true to rest', async(() => {
//       const data = createTestData(),
//             expectedHiddenCount = data[0].items.length - 1,
//             expectedNonHiddenCount = 1

//       showOnlyFirstError(data)

//       const [hidden, nonHidden] = partitionHidden(data)

//       assert(hidden.length === expectedHiddenCount && nonHidden.length === expectedNonHiddenCount)
//     }))

//     test('#hideAllErrors sets isHidden to true on all items', async(() => {
//       const data = createTestData(),
//             expectedHiddenCount = data[0].items.length

//       hideAllErrors(data)

//       const [hidden] = partitionHidden(data)

//       assert(hidden.length === expectedHiddenCount)
//     }))
//   })
// })
