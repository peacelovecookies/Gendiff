#!/usr/bin/env node

import { Command } from 'commander';
// import pkg from '../../package'; # TODO: know how to import version from package.json

import gendiff from '../gendiff.js';

const program = new Command();

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format, by default "pretty"', 'pretty')
  .option('-n, --sign <type>', 'sign used for formatting identations. By default, " " (one space)', ' ')
  .option('-s, --spaces <number>', 'count of spaces in pretty format, by default 4.', '4')
  .option('-t, --sort <boolean>', 'sort output by keys. By default, true.', 'true')
  .action((filepath1, filepath2, cmdObj) => {
    // eslint-disable-next-line object-curly-newline
    const { format, sign, spaces, sort } = cmdObj;
    const booleans = {
      true: true,
      false: false,
    };
    const result = gendiff(
      filepath1,
      filepath2,
      {
        format,
        spacesSign: sign,
        spacesCount: parseInt(spaces, 10),
        sort: booleans[sort],
      },
    );

    console.log(`\n${result}`);
  });

program.parse(process.argv);
