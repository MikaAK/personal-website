import {actionCond, mergeToState, mergeToStateProp, updateStateProp, updateByKey, storeByKey} from '.'

type TestState = {
  bill: number
  billTheSecond: number
  testObj?: {[key: string]: object}
}

type TestActionCondTuple = [TestState, PayloadAction<number>]

const DUMMY_ACTION = 'BLAH',
      DUMMY_PAYLOAD = 3,
      createDummyPayload = () => ({type: DUMMY_ACTION, payload: DUMMY_PAYLOAD})

describe('Helpers: ReducerUtil', () => {
  describe('#actionCond', () => {
    test('can provide a array of [action, (StateActionTuple) => State] for state modification', () => {
      const state = {bill: 1, billTheSecond: 0}
      const condMap = actionCond<TestState>([
        [DUMMY_ACTION, ([tState, {payload}]: TestActionCondTuple) => ({...tState, bill: payload})]
      ])

      const expected = {bill: DUMMY_PAYLOAD, billTheSecond: 0}

      assert.deepEqual(condMap(state, createDummyPayload()), expected)
    })
  })

  describe('#mergeToState', () => {
    test('merges a function taking in StateActionTuple into state', () => {
      const state = {bill: 1, billTheSecond: 0},
            addToState = ([tState]: TestActionCondTuple) => ({billTheSecond: tState.bill + 2}),
            expected = {...state, ...addToState([state, createDummyPayload()])},
            actual = mergeToState(addToState)([state, createDummyPayload()])

      assert.deepEqual(actual, expected)
    })
  })

  describe('#mergeToStateProp', () => {
    test('merges a function taking in StateActionTuple to state prop', () => {
      const state = {bill: 1, billTheSecond: 0},
            addToState = ([tState, {payload}]: TestActionCondTuple) => tState.bill + payload,
            expected = {bill: state.bill + DUMMY_PAYLOAD, billTheSecond: 0},
            actual = mergeToStateProp('bill', addToState)([state, createDummyPayload()])

      assert.deepEqual(actual, expected)
    })
  })

  describe('#updateStateProp', () => {
    test('takes prop and function and returns function that updates the states with result', () => {
      const state = {bill: 5, billTheSecond: 5}
      const updater = updateStateProp<TestState, number>('bill', (payload, iState) => iState.bill + payload)

      const expected = {bill: 10, billTheSecond: 5}

      assert.deepEqual(updater([state, {type: '', payload: 5}]), expected)
    })
  })

  describe('#storeByKey', () => {
    test('takes an id prop and returns function that takes list of items and returns {prop: item}', () => {
      const item1 = {id: 5}
      const item2 = {id: 50}

      const idStore = storeByKey('id')

      const expected = {[item1.id]: item1, [item2.id]: item2}

      assert.deepEqual(idStore([item1, item2]), expected)
    })
  })

  describe('#updateByKey', () => {
    test('takes id prop and returns function that takes an item and the {prop: item} and updates it', () => {
      const ITEM_ID = 5
      const state = {[ITEM_ID]: {id: ITEM_ID, bill: 5}}
      const newItem = {id: ITEM_ID, bill: 10}
      const expected = {[ITEM_ID]: newItem}

      const idUpdate = updateByKey('id')

      assert.deepEqual(idUpdate(newItem, state), expected)
    })
  })
})
