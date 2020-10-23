import Parser from './Parser';

export default (filepath1, filepath2, options) => {
  const fileBefore = Parser.parse(filepath1);
  const fileAfter = Parser.parse(filepath2);
  const ast = new Parser(fileBefore, fileAfter).getAST();

  // #TODO: create Formatter class which formats ast
  // const formatter = new Formatter(options);

  // return formatter.format(ast);
};
