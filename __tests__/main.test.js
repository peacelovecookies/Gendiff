import { describe, expect, it } from '@jest/globals';

import path from 'path';

import gendiff from '..';
import { prettyFormat, jsonFormat, plainFormat } from '../__fixtures__/results/formatting';

describe('main (entering point) checking', () => {
  const filepath1 = path.resolve(__dirname, '..', '__fixtures__', 'before.yaml');
  const filepath2 = path.resolve(__dirname, '..', '__fixtures__', 'after.yaml');

  const prettyOpt = { };
  const jsonOpt = { format: 'json' };
  const plainOpt = { format: 'plain' };

  const formatsCase = [
    [prettyOpt, prettyFormat],
    [jsonOpt, jsonFormat],
    [plainOpt, plainFormat],
  ];

  it.each(formatsCase)('should find diff', (options, rightResult) => {
    const result = gendiff(filepath1, filepath2, options);
    expect(result).toEqual(rightResult.trim());
  });
});
