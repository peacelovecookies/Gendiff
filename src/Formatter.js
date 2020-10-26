import _ from 'lodash';
import isObject from './utils.js';
import Parser from './Parser.js';

export default class Formatter {
  constructor(options) {
    const { format, replacer, spacesCount } = options;
    this.format = format ?? 'pretty';
    this.replacer = replacer ?? ' ';
    this.spacesCount = spacesCount ?? 4;
    this.formatters = {
      json: (ast) => JSON.stringify(ast),
      pretty: this.stringifyPretty.bind(this),
      plain: this.stringifyPlain.bind(this),
    };
    this.formatter = this.formatters[format];
  }

  getValue(value, depth) {
    if (isObject(value)) {
      const ast = Parser.getAST(value, value);
      return this.stringifyPretty(ast, depth + 1);
    }
    return _.isArray(value) ? `[${value.join(', ')}]` : value;
  }

  makeLinePretty(child, depth) {
    const { key, type } = child;
    const { replacer, spacesCount = 4 } = this;
    const identSize = depth * spacesCount;
    const deepIdentSize = identSize + spacesCount / 2;
    const deepIdent = replacer.repeat(deepIdentSize);

    const linesBy = {
      nested: () => `${deepIdent}  ${key}: ${this.stringifyPretty(child.children, depth + 1)}`,
      deleted: () => `${deepIdent}- ${key}: ${this.getValue(child.oldValue, depth)}`,
      added: () => `${deepIdent}+ ${key}: ${this.getValue(child.newValue, depth)}`,
      unchanged: () => `${deepIdent}  ${key}: ${this.getValue(child.value, depth)}`,
      changed: () => [
        `${deepIdent}- ${key}: ${this.getValue(child.oldValue, depth)}`,
        `${deepIdent}+ ${key}: ${this.getValue(child.newValue, depth)}`,
      ].join('\n'),
    };

    return linesBy[type]();
  }

  stringifyPlain(nodes, path = []) {
    return nodes
      .map((node) => {
        const { key, type } = node;
        const property = `Property '${[...path, key].join('.')}'`;

        const mapValue = (value) => {
          if (isObject(value)) {
            return '[complex value]';
          }
          if (_.isArray(value)) {
            return `[${value.join(', ')}]`;
          }

          return typeof value === 'string' ? `'${value}'` : value;
        };

        const linesBy = {
          unchanged: () => [],
          nested: () => this.stringifyPlain(node.children, [...path, key]),
          deleted: () => `${property} was removed`,
          added: () => {
            const value = mapValue(node.newValue);
            return `${property} was added with value: ${value}`;
          },
          changed: () => {
            const oldValue = mapValue(node.oldValue);
            const newValue = mapValue(node.newValue);
            return `${property} was updated. From ${oldValue} to ${newValue}`;
          },
        };
        return linesBy[type]();
      })
      .join('\n');
  }

  stringifyPretty(nodes, depth = 0) {
    const { replacer, spacesCount = 4 } = this;
    const identSize = depth * spacesCount;
    const currentIdent = replacer.repeat(identSize);

    const lines = nodes
      .map((child) => this.makeLinePretty(child, depth));

    return [
      '{',
      ...lines,
      `${currentIdent}}`,
    ].join('\n');
  }

  stringify(ast) {
    const { formatter } = this;
    if (!formatter) {
      const formats = Object.keys(this.formatters);
      const err = new Error();
      err.name = 'INVALID_FORMAT';
      err.message = `Use of following formats: ${formats.join(', ')}`;
      throw err;
    }

    return formatter(ast);
  }
}
