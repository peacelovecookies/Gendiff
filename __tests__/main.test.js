import { describe, expect, test } from '@jest/globals';

import path from 'path';

import Parser from '../src/Parser';
import Formatter from '../src/Formatter';
import { stringFormat, jsonFormat, plainFormat } from '../__fixtures__/results/formatting';

describe('main (entering point) checking', () => {
  const filepath1 = path.resolve(__dirname, '..', '__fixtures__', 'before.json');
  const filepath2 = path.resolve(__dirname, '..', '__fixtures__', 'after.json');
  const file1 = Parser.parse(filepath1);
  const file2 = Parser.parse(filepath2);
  const parser = new Parser();
  const ast = parser.getAST(file1, file2);

  test('wrong format', () => {
    const formatter = new Formatter({ format: 'wrooooong' });
    const formats = formatter.formatters.join(', ');
    expect(() => formatter.stringify(ast)).toThrow(`Use one of the following formats: ${formats}`);
  });
  const differentFormatsCase = [
    ['pretty', stringFormat],
    ['json', jsonFormat],
    ['plain', plainFormat],
  ];

  test.each(differentFormatsCase)('%p format', (format, result) => {
    const formatter = new Formatter({ format });
    const formatted = formatter.stringify(ast);

    expect(formatted).toEqual(result.trim());
  });
});
