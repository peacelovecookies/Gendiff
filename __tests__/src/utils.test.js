import { describe, expect, test } from '@jest/globals';
import isObject from '../../src/utils';

describe('yet isObject function test only', () => {
  test('non-object elements', () => {
    const num = 5;
    const str = 'heyheyhey';
    const arr = ['yes'];

    expect(isObject(num)).toEqual(false);
    expect(isObject(str)).toEqual(false);
    expect(isObject(arr)).toEqual(false);
  });

  test('object', () => {
    const obj = { huh: 'yeah' };

    expect(isObject(obj)).toEqual(true);
  });
});
