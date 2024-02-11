import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Add })).toBe(8);
    expect(simpleCalculator({ a: -5, b: 3, action: Action.Add })).toBe(-2);
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Add })).toBe(0);
    expect(simpleCalculator({ a: 9999999999999999, b: 1, action: Action.Add })).toBe(10000000000000000);
    expect(simpleCalculator({ a: -9999999999999999, b: -1, action: Action.Add })).toBe(-10000000000000000);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Subtract })).toBe(2);
    expect(simpleCalculator({ a: -5, b: 3, action: Action.Subtract })).toBe(-8);
    expect(simpleCalculator({ a: 0, b: 0, action: Action.Subtract })).toBe(0);
    expect(simpleCalculator({ a: 100, b: 50, action: Action.Subtract })).toBe(50);
    expect(simpleCalculator({ a: -100, b: -50, action: Action.Subtract })).toBe(-50);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Multiply })).toBe(15);
    expect(simpleCalculator({ a: -5, b: 3, action: Action.Multiply })).toBe(-15);
    expect(simpleCalculator({ a: 0, b: 100, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: 100, b: 0, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: -9999999999999999, b: 0.5, action: Action.Multiply })).toBe(-4999999999999999.5);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 3, action: Action.Divide })).toBe(2);
    expect(simpleCalculator({ a: -6, b: 3, action: Action.Divide })).toBe(-2);
    expect(simpleCalculator({ a: 0, b: 100, action: Action.Divide })).toBe(0);
    expect(simpleCalculator({ a: 100, b: 0.5, action: Action.Divide })).toBe(200);
    expect(simpleCalculator({ a: -10, b: -2, action: Action.Divide })).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(8);
    expect(simpleCalculator({ a: -2, b: 4, action: Action.Exponentiate })).toBe(16);
    expect(simpleCalculator({ a: 0, b: 10, action: Action.Exponentiate })).toBe(0);
    expect(simpleCalculator({ a: 5, b: 0, action: Action.Exponentiate })).toBe(1);
    expect(simpleCalculator({ a: 2, b: 0.5, action: Action.Exponentiate })).toBe(Math.sqrt(2));
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: '$' })).toBe(null);
    expect(simpleCalculator({ a: 5, b: 3, action: '%' })).toBe(null);
    expect(simpleCalculator({ a: 5, b: 3, action: 'test' })).toBe(null);
    expect(simpleCalculator({ a: 5, b: 3, action: undefined })).toBe(null);
    expect(simpleCalculator({ a: 5, b: 3, action: null })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '5', b: '3', action: Action.Add })).toBe(null);
    expect(simpleCalculator({ a: 5, b: 'test', action: Action.Subtract })).toBe(null);
    expect(simpleCalculator({ a: 'hello', b: 'world', action: Action.Multiply })).toBe(null);
    expect(simpleCalculator({ a: {}, b: [], action: Action.Divide })).toBe(null);
    expect(simpleCalculator({ a: true, b: false, action: Action.Exponentiate })).toBe(null);
  });
});
