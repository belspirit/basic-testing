// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { Action, simpleCalculator } from '01-simple-tests';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    let result = simpleCalculator({ a: 1, b: 2, action: Action.Add });
    expect(result).toBe(3);

    result = simpleCalculator({ a: -3, b: 1, action: Action.Add });
    expect(result).toBe(-2);

    result = simpleCalculator({ a: -4, b: -5, action: Action.Add });
    expect(result).toBe(-9);
  });

  test('should substract two numbers', () => {
    let result = simpleCalculator({ a: 1, b: 2, action: Action.Substract });
    expect(result).toBe(-1);

    result = simpleCalculator({ a: -3, b: 1, action: Action.Substract });
    expect(result).toBe(-4);

    result = simpleCalculator({ a: -4, b: -5, action: Action.Substract });
    expect(result).toBe(1);
  });

  test('should multiply two numbers', () => {
    let result = simpleCalculator({ a: 1, b: 2, action: Action.Multiply });
    expect(result).toBe(2);

    result = simpleCalculator({ a: -3, b: 1, action: Action.Multiply });
    expect(result).toBe(-3);

    result = simpleCalculator({ a: -4, b: -5, action: Action.Multiply });
    expect(result).toBe(20);
  });

  test('should divide two numbers', () => {
    let result = simpleCalculator({ a: 1, b: 2, action: Action.Divide });
    expect(result).toBe(0.5);

    result = simpleCalculator({ a: -3, b: 1, action: Action.Divide });
    expect(result).toBe(-3);

    result = simpleCalculator({ a: -20, b: -5, action: Action.Divide });
    expect(result).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    let result = simpleCalculator({ a: 1, b: 2, action: Action.Exponentiate });
    expect(result).toBe(1);

    result = simpleCalculator({ a: -3, b: 1, action: Action.Exponentiate });
    expect(result).toBe(-3);

    result = simpleCalculator({ a: 4, b: -1, action: Action.Exponentiate });
    expect(result).toBe(0.25);

    result = simpleCalculator({ a: 3, b: 3, action: Action.Exponentiate });
    expect(result).toBe(27);

    result = simpleCalculator({ a: -3, b: 2, action: Action.Exponentiate });
    expect(result).toBe(9);
  });

  test('should return null for invalid action', () => {
    let result = simpleCalculator({ a: 1, b: 2, action: 'badop' });
    expect(result).toBeNull();

    result = simpleCalculator({ a: 1, b: 2, action: '' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    let result = simpleCalculator({ a: '1', b: 2, action: Action.Add });
    expect(result).toBeNull();

    result = simpleCalculator({ a: 1, b: {}, action: Action.Add });
    expect(result).toBeNull();

    result = simpleCalculator({ a: null, b: 2, action: Action.Add });
    expect(result).toBeNull();

    result = simpleCalculator({ a: 1, b: undefined, action: Action.Add });
    expect(result).toBeNull();
  });
});
