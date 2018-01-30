import {buildQueryList} from '../../test-factories'

import {queryListHasItems, queryListTail} from '.'

describe('Helpers: Angular', () => {
  describe('#queryListTail', () => {
    test('returns all but first item', () => {
      const item1 = {a: 1},
            item2 = {a: 2},
            item3 = {a: 3}

      const queryList = buildQueryList<{a: number}>([item1, item2, item3])

      assert.deepEqual(queryListTail(queryList), [item2, item3])
    })
  })

  describe('#queryListHasItems', () => {
    test('returns true if items are present in QueryList', () => {
      const queryList = buildQueryList<{a: number}>([{a: 3}])

      assert.ok(queryListHasItems(queryList))
    })

    test('returns false if no items are present in QueryList', () => {
      const queryList = buildQueryList<{a: number}>([])

      assert.ok(!queryListHasItems(queryList))
    })
  })
})
