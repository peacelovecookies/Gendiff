import YAML from 'yaml';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

import _ from 'lodash';
import { isObject, getMeta } from './utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Parser {
  constructor(file1, file2) {
    this.file1 = file1;
    this.file2 = file2;
  }

  getAST() {
    const { fileBefore, fileAfter } = this;

    const iter = (obj1, obj2) => {
      const merged = _.merge(obj1, obj2);
      const entries = Object.entries(merged);
      return entries
        .sort(([key1], [key2]) => key1 > key2)
        .flatMap(([key, value]) => {
          if (isObject(value)) {
            return { key, children: iter(obj1[key], obj2[key]), type: 'nested' };
          }
          return getMeta(key, obj1, obj2);
        });
    };

    return iter(fileBefore, fileAfter);
  }

  static parsers = {
    '.json': JSON.parse,
    '.yaml': YAML.parse,
    '.yml': YAML.parse,
  };

  static parse(filepath) {
    const fullpath = path.resolve(__dirname, filepath);
    const file = fs.readFileSync(fullpath, 'utf-8');
    const ext = path.extname(filepath);
    const parser = this.parsers[ext];

    return parser(file);
  }
}
