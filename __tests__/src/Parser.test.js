import { describe, expect, test } from '@jest/globals';

import path from 'path';

import Parser from '../../src/Parser';
import { parsedObj, ast as resultAST } from '../../__fixtures__/results/parsing';

describe('Parsing tests', () => {
  test('unsupported extension', () => {
    const exts = Object.keys(Parser.parsers).join(', ');
    expect(() => Parser.parse('./file.exe')).toThrow(`Currently we support only ${exts}`);
  });

  const differentExtCase = [
    ['.json', parsedObj],
    ['.yaml', parsedObj],
    ['.yml', parsedObj],
  ];

  test.each(differentExtCase)('%p format', (ext, result) => {
    const filepath = path.resolve(__dirname, '../..', '__fixtures__', `before${ext}`);
    const parsed = Parser.parse(filepath);
    expect(parsed).toEqual(result);
  });

  test('pasring ast', () => {
    const filepath1 = path.resolve(__dirname, '../..', '__fixtures__', 'before.json');
    const filepath2 = path.resolve('__fixtures__/after.json');
    const parsed1 = Parser.parse(filepath1);
    const parsed2 = Parser.parse(filepath2);

    const parser = new Parser({});
    const ast = parser.getAST(parsed1, parsed2);

    expect(ast).toEqual(resultAST);
  });
});
