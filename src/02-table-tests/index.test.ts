import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: -3, b: 1, action: Action.Add, expected: -2 },
  { a: -4, b: -5, action: Action.Add, expected: -9 },
  { a: 1, b: 2, action: Action.Substract, expected: -1 },
  { a: -3, b: 1, action: Action.Substract, expected: -4 },
  { a: -4, b: -5, action: Action.Substract, expected: 1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: -3, b: 1, action: Action.Multiply, expected: -3 },
  { a: -4, b: -5, action: Action.Multiply, expected: 20 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: -3, b: 1, action: Action.Divide, expected: -3 },
  { a: -20, b: -5, action: Action.Divide, expected: 4 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: -3, b: 1, action: Action.Exponentiate, expected: -3 },
  { a: 4, b: -1, action: Action.Exponentiate, expected: 0.25 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: -3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 1, b: 2, action: 'badop', expected: null },
  { a: 1, b: 2, action: '', expected: null },
  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: 1, b: {}, action: Action.Add, expected: null },
  { a: null, b: 2, action: Action.Add, expected: null },
  { a: 1, b: undefined, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.only.each(testCases)(
    '$a $action $b = $expected',
    ({ a, b, action, expected }) => {
      let result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
