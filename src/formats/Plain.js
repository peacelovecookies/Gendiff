import _ from 'lodash';
import isObject from '../utils.js';

export default class Plain {
  constructor(options) {
    const { spacesSign, spacesCount } = options;
    this.spacesSign = spacesSign;
    this.spacesCount = spacesCount;
  }

  static getValue(value) {
    if (isObject(value)) {
      return '[complex value]';
    }
    if (_.isArray(value)) {
      return `[${value.join(', ')}]`;
    }
    return typeof value === 'string' ? `'${value}'` : value;
  }

  makeLine(node, path) {
    const { getValue } = Plain;

    const { key, type, children } = node;
    const { oldValue, newValue } = node;

    const currentPath = [...path, key];
    const property = `Property '${currentPath.join('.')}'`;

    const lines = {
      nested: () => this.format(children, currentPath),
      deleted: () => `${property} was removed`,
      changed: () => `${property} was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`,
      // eslint-disable-next-line object-shorthand
      added: () => `${property} was added with value: ${getValue(newValue)}`,
      unchanged: () => [],
    };
    return lines[type]();
  }

  format(nodes, path = []) {
    return nodes
      .flatMap((node) => this.makeLine(node, path))
      .join('\n');
  }
}
