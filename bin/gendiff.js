#!/usr/bin/env node

import { Command } from 'commander';
import { version } from '../package.json';

import gendiff from '../src/gendiff';

const program = new Command();

program
  .version(version)
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'string')
  .action((filepath1, filepath2, cmdObj) => gendiff(
    filepath1,
    filepath2,
    { options: { format: cmdObj.format } },
  ));

program.parse(process.argv);
