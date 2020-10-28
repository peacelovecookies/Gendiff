export default class Json {
  constructor(options) {
    const { spacesSign, spacesCount } = options;
    this.spacesSign = spacesSign;
    this.spacesCount = spacesCount ?? 0;
  }

  format(ast) {
    const { spacesSign, spacesCount } = this;
    const space = spacesSign.repeat(spacesCount);
    const replacer = (key, value) => {
      if (value && value.constructor === RegExp) { // convert RegExp to string
        return value.toString();
      }
      return value;
    };

    return JSON.stringify(ast, replacer, space);
  }
}
