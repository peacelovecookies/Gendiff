#!/usr/bin/env node

import { Command } from 'commander';
//import pkg from '../../package';

import gendiff from '../gendiff.js';

const program = new Command();

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'pretty')
  .action((filepath1, filepath2, cmdObj) => {
    const result = gendiff(
      filepath1,
      filepath2,
      { format: cmdObj.format },
    );

    console.log(`\n${result}`);
  });

program.parse(process.argv);
