import YAML from 'yaml';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

import _ from 'lodash';
import isObject from './utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Parser {
  static getValue(key, obj) {
    const value = obj[key];
    return isObject(value) ? this.getAST(value, value) : value;
  }

  static getMeta(key, [obj1, obj2]) {
    const oldValue = this.getValue(key, obj1);
    const newValue = this.getValue(key, obj2);
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', oldValue };
    }
    if (!_.has(obj1, key)) {
      return { key, type: 'added', newValue };
    }
    if (obj1[key] === obj2[key]) {
      return { key, type: 'unchanged', value: oldValue };
    }
    // eslint-disable-next-line object-curly-newline
    return { key, type: 'changed', oldValue, newValue };
  }

  static getAST(fileBefore, fileAfter) {
    const iter = (...objects) => {
      const clone = _.cloneDeep(objects);
      const [obj1, obj2] = objects;
      const merged = _.merge(...clone);
      const keys = Object.keys(merged);
      return keys
        .sort()
        .flatMap((key) => {
          const valueBefore = obj1[key];
          const valueAfter = obj2[key];
          if (isObject(valueBefore) && isObject(valueAfter)) {
            return { key, type: 'nested', children: iter(valueBefore, valueAfter) };
          }
          return this.getMeta(key, objects);
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
