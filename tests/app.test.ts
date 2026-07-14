import { describe, test, expect } from '@jest/globals';
import { sum } from '../src/app.ts';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
