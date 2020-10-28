import _ from 'lodash';
import isObject from '../utils.js';
import Parser from '../Parser.js';

export default class Pretty {
  constructor(options) {
    const { spacesSign, spacesCount, sort } = options;
    this.spacesSign = spacesSign;
    this.spacesCount = spacesCount ?? 4;
    this.sort = sort;
  }

  getValue(value, depth) {
    if (isObject(value)) {
      const { sort } = this;
      const ast = new Parser({ sort }).getAST(value, value);
      return this.format(ast, depth);
    }
    return _.isArray(value) ? `[${value.join(', ')}]` : value;
  }

  makeLine(node, depth) {
    const { spacesSign, spacesCount } = this;
    const getValue = this.getValue.bind(this);

    const { key, type, children } = node;
    const { value, oldValue, newValue } = node;

    const nextDepth = depth + 1;
    const identSize = depth * spacesCount;
    const deepIdentSize = identSize + spacesCount / 2;
    const deepIdent = spacesSign.repeat(deepIdentSize);
    const filler = spacesSign.repeat(2);

    const lines = {
      nested: () => `${deepIdent}${filler}${key}: ${this.format(children, nextDepth)}`,
      deleted: () => `${deepIdent}- ${key}: ${getValue(oldValue, nextDepth)}`,
      added: () => `${deepIdent}+ ${key}: ${getValue(newValue, nextDepth)}`,
      changed() {
        return [this.deleted(), this.added()].join('\n');
      },
      unchanged: () => `${deepIdent}${filler}${key}: ${getValue(value, nextDepth)}`,
    };
    return lines[type]();
  }

  format(nodes, depth = 0) {
    const { spacesSign, spacesCount } = this;
    const identSize = depth * spacesCount;
    const currentIdent = spacesSign.repeat(identSize);
    const lines = nodes
      .map((child) => this.makeLine(child, depth));

    return [
      '{',
      ...lines,
      `${currentIdent}}`,
    ].join('\n');
  }
}
