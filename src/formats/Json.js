export default class Json {
  constructor(options) {
    const { spacesSign, spacesCount } = options;
    this.spacesSign = spacesSign;
    this.spacesCount = spacesCount ?? 0;
  }

  format(ast) {
    const { spacesSign, spacesCount } = this;
    const space = spacesSign.repeat(spacesCount);
    const replacer = null; // may be modified in the future, may be not

    return JSON.stringify(ast, replacer, space);
  }
}
