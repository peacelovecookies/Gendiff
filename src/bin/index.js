#!/usr/bin/env node

import { program } from 'commander';
import { version } from '../../package.json';

program
  .command('gendiff <filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version(version)
  .option('-f, --format [type]', 'output format')
  .parse(process.argv)