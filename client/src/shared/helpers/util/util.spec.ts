import {anyTrue, trimStringEntries} from '.'

describe('Helpers: Util', () => {
  describe('#anyTrue', () => {
    type AnyTrueTestConfig = {
      caseInfo: string
      item: any[]
      expected: boolean
    }

    const testAnyTrue = ({caseInfo, item, expected}: AnyTrueTestConfig) => {
      test(`given ${caseInfo} returns ${expected}`, () => {
        assert(anyTrue(item) === expected)
      })
    }

    const anyTrueTests = <AnyTrueTestConfig[]>[{
      caseInfo: 'nil',
      item: null,
      expected: false
    }, {
      caseInfo: 'empty array ([])',
      item: [],
      expected: false
    }, {
      caseInfo: 'empty object ({})',
      item: {},
      expected: false
    }, {
      caseInfo: 'object with false prop ({prop: false})',
      item: {prop: false},
      expected: false
    }, {
      caseInfo: 'object with true prop ({prop: true})',
      item: {prop: true},
      expected: true
    }, {
      caseInfo: 'array with false prop ([{prop: false}])',
      item: [{prop: false}],
      expected: false
    }, {
      caseInfo: 'array with true prop ([{prop: true}])',
      item: [{prop: true}],
      expected: true
    }]

    anyTrueTests.forEach(testAnyTrue)
  })

  describe('#trimStringEntries', () => {
    test('given an object with string values it trims them', () => {
      const input = {
        myKey: 3,
        myString: '  testing   '
      }
      const actual = trimStringEntries<any>(input)

      assert(actual.myKey === input.myKey)
      assert(actual.myString === 'testing')
    })
  })
})
