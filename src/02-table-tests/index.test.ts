import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 5, b: 3, action: Action.Add, expected: 8 },
  { a: -5, b: 3, action: Action.Add, expected: -2 },
  { a: 0, b: 0, action: Action.Add, expected: 0 },
  {
    a: 9999999999999999,
    b: 1,
    action: Action.Add,
    expected: 10000000000000000,
  },
  {
    a: -9999999999999999,
    b: -1,
    action: Action.Add,
    expected: -10000000000000000,
  },

  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: -5, b: 3, action: Action.Subtract, expected: -8 },
  { a: 0, b: 0, action: Action.Subtract, expected: 0 },
  { a: 100, b: 50, action: Action.Subtract, expected: 50 },
  { a: -100, b: -50, action: Action.Subtract, expected: -50 },

  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: -5, b: 3, action: Action.Multiply, expected: -15 },
  { a: 0, b: 100, action: Action.Multiply, expected: 0 },
  { a: 100, b: 0, action: Action.Multiply, expected: 0 },
  {
    a: -9999999999999999,
    b: 0.5,
    action: Action.Multiply,
    expected: -4999999999999999.5,
  },

  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: -6, b: 3, action: Action.Divide, expected: -2 },
  { a: 0, b: 100, action: Action.Divide, expected: 0 },
  { a: 100, b: 0.5, action: Action.Divide, expected: 200 },
  { a: -10, b: -2, action: Action.Divide, expected: 5 },

  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: -2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 0, b: 10, action: Action.Exponentiate, expected: 0 },
  { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 0.5, action: Action.Exponentiate, expected: Math.sqrt(2) },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should ${action} ${a} and ${b}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: '&' });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '5', b: '3', action: Action.Add });
    expect(result).toBe(null);
  });
});
