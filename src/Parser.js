import YAML from 'yaml';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Parser {
  constructor(file1, file2) {
    this.file1 = file1;
    this.file2 = file2;
  }

  static parsers = {
    '.json': JSON.parse,
    '.yaml': YAML.parse,
    '.yml': YAML.parse,
  };

  static parse(filepath) {
    const fullpath = path.resolve(__dirname, filepath);
    const file = fs.readSync(fullpath);
    const ext = path.extname(filepath);
    const parser = this.parsers[ext];

    return parser(file);
  }
}
