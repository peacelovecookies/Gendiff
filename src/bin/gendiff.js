#!/usr/bin/env node

import { Command } from 'commander';
//import pkg from '../../package'; # TODO: know how to import version from package.json

import gendiff from '../gendiff.js';

const program = new Command();

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format, by default "pretty"', 'pretty')
  .option('-r, --replacer <type>', 'replacer, which used in pretty format, by default " " (one space)', ' ')
  .option('-s, --spaces <number>', 'count of spaces in pretty format, by default 4', 4)
  .action((filepath1, filepath2, cmdObj) => {
    const { format, replacer, spaces } = cmdObj;
    const result = gendiff(
      filepath1,
      filepath2,
      {
        format,
        replacer,
        spacesCount: spaces,
      },
    );

    console.log(`\n${result}`);
  });

program.parse(process.argv);
