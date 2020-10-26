import YAML from 'yaml';
import fs from 'fs';
import path from 'path';

import _ from 'lodash';
import isObject from './utils.js';

export default class Parser {
  static getMeta(key, [obj1, obj2]) {
    const oldValue = obj1[key];
    const newValue = obj2[key];
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', oldValue };
    }
    if (!_.has(obj1, key)) {
      return { key, type: 'added', newValue };
    }
    if (isObject(oldValue) && isObject(newValue)) {
      return { key, type: 'nested', children: this.getAST(oldValue, newValue) };
    }
    if (_.isEqual(oldValue, newValue)) {
      return { key, type: 'unchanged', value: oldValue };
    }
    // eslint-disable-next-line object-curly-newline
    return { key, type: 'changed', oldValue, newValue };
  }

  static getAST(fileBefore, fileAfter) {
    const iter = (...objects) => {
      const clone = _.cloneDeep(objects);
      const merged = _.merge(...clone);
      const keys = Object.keys(merged);
      return keys
        .sort()
        .map((key) => this.getMeta(key, objects));
    };

    return iter(fileBefore, fileAfter);
  }

  static parsers = {
    '.json': JSON.parse,
    '.yaml': YAML.parse,
    '.yml': YAML.parse,
  };

  static parse(filepath) {
    const currentDir = process.cwd();
    const fullpath = path.resolve(currentDir, filepath);
    const ext = path.extname(filepath);
    const parser = this.parsers[ext];

    if (!parser) {
      const exts = Object.keys(Parser.parsers).join(', ');
      const err = new Error();
      err.name = 'UNSUPPORTED_EXTENSION';
      err.message = `Currently we support only ${exts}`;
      throw err;
    }
    const file = fs.readFileSync(fullpath, 'utf-8');

    return parser(file);
  }
}
