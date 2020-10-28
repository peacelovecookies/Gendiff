import Parser from './Parser.js';
import Formatter from './Formatter.js';

export default (filepath1, filepath2, options) => {
  const fileBefore = Parser.parse(filepath1);
  const fileAfter = Parser.parse(filepath2);

  const parser = new Parser(options);
  const ast = parser.getAST(fileBefore, fileAfter);

  const formatter = new Formatter(options);

  return formatter.stringify(ast);
};
