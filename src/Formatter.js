import Pretty from './formats/Pretty.js';
import Plain from './formats/Plain.js';
import Json from './formats/Json.js';

export default class Formatter {
  constructor(options) {
    const { format = 'pretty', spacesCount, spacesSign = ' ' } = options;
    const formatters = {
      json: Json,
      pretty: Pretty,
      plain: Plain,
    };

    this.formatters = Object.keys(formatters);
    this.FormatterClass = formatters[format];
    this.options = { spacesSign, spacesCount };
  }

  stringify(ast) {
    const { formatters, FormatterClass, options } = this;
    if (!FormatterClass) {
      const err = new Error();
      err.name = 'INVALID_FORMAT';
      err.message = `Use one of the following formats: ${formatters.join(', ')}`;
      throw err;
    }
    const formatter = new FormatterClass(options);

    return formatter.format(ast);
  }
}
