# frontend-project-lvl2
![Node CI](https://github.com/peacelovecookies/frontend-project-lvl2/workflows/Node%20CI/badge.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/4bb889005323f929a5be/maintainability)](https://codeclimate.com/github/peacelovecookies/frontend-project-lvl2/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/4bb889005323f929a5be/test_coverage)](https://codeclimate.com/github/peacelovecookies/frontend-project-lvl2/test_coverage)

---

## Install

1. Simply copy-paste this in your bash/terminal: `sudo npm i plc_gendiff` or `sudo npm i -g plc_gendiff` if you want to use as a cli-app.
2. Enter your system password.
3. Use it as [library](#library) in your code or right in your bash as a [cli-application](#cli-application).

## Uninstall:

Didn't like the app? Uninstall it: `sudo npm uninstall -g plc_gendiff`

## Library

_If you want to use it as a library for your project, check following documentation with expamples._

### Arguments

`filepath1` (_String_): filepath to first (initial) file. Can be both absolute and relative.

`filepath2` (_String_): filepath to second (changed) file. Can be both absolute and relative.

`options` (_Object_):

- `format` (_String_): format of outputed result. Can be 'pretty', 'json', 'plain', for more details check up examples. By default, 'pretty'. _[Optional]_
- `sort` (_Boolean_): sort output by keys. By default, true. _[Optional]_
- `spacesSign` (_String_): sign used for formatting identations. By default, ' ' (one space). _[Optional]_
- `spacesCount` (_Number_): count of spaces. Recommended to use even number: 2, 4 or higher. By default, 4.  for pretty format, 0 – for json. _[Optional]_

### Return
    
`diff` (_String_): difference between two **configuration** files. Format of output depends on format option.

### Example

<details>
<summary>Initial files: </summary>
    
```javascript
// file1.json
{
  "z": true,
  "b": {
    "c": "nested"
  },
  "y": {
    "delete": "it"
  },
  "array": {
    "change": "this"
  },
  "or": "change this",
}

// file2.json
{
  "z": true,
  "b": {
    "c": 5
  },
  "array": "now it is string"
  "or": "wanna some milk?",
  "add": {
    "object": "here",
    "nobody": "reads documentation..."
  }
}
```

</details>

<details>
  <summary>Pretty format: </summary>

  ```javascript
  // app.js
  import gendiff from 'plc_gendiff';

  const prettyOptions = { format: 'pretty', spacesSign: '_' };
  const pretty = gendiff(path/to/file1, path/to/file2, prettyOptions);
  ```

  <details>
    <summary>console.log(pretty);</summary>

    ```
    {
    __+ add: {
    ________nobody: reads documentation...
    ________object: here
    ____}
    __- array: {
    ________change: this
    ____}
    __+ array: now it is string
    __- array_as_value: [1, 2, 3]
    __+ array_as_value: [1, 2, 5]
    ____b: {
    ______- c: nested
    ______+ c: 5
    ____}
    __- or: change this
    __+ or: wanna some milk?
    __- y: {
    ________delete: it
    ____}
    ____z: true
    }
    ```

  </details>

</details>

<details>
  <summary>Plain format: </summary>

  ``` // app.js
  import gendiff from 'plc_gendiff';

  const plainOptions = { format: 'plain', sort: 'false' };
  const plain = gendiff(path/to/file1, path/to/file2, plainOptions);
  ```

  <details>
    <summary>console.log(plain)</summary>
    
    Property 'b.c' was updated. From 'nested' to 5
    Property 'y' was removed
    Property 'array' was updated. From [complex value] to 'now it is string'
    Property 'or' was updated. From 'change this' to 'wanna some milk?'
    Property 'array_as_value' was updated. From [1, 2, 3] to [1, 2, 5]
    Property 'add' was added with value: [complex value]
  
  </details>
</details>

<details>
  <summary>Json format: </summary>

  ``` // app.js
  import gendiff from 'plc_gendiff';

  const jsonOptions = { format: 'json', sort: 2 };
  const json = gendiff(path/to/file1, path/to/file2, jsonOptions);
  ```

  <details>
    <summary>console.log(json)</summary>

  ```
  [
    {
      "key": "add",
      "type": "added",
      "newValue": {
        "object": "here",
        "nobody": "reads documentation..."
      }
    },
    {
      "key": "array",
      "type": "changed",
      "oldValue": {
        "change": "this"
      },
      "newValue": "now it is string"
    },
    {
      "key": "array_as_value",
      "type": "changed",
      "oldValue": [
        1,
        2,
        3
      ],
      "newValue": [
        1,
        2,
        5
      ]
    },
    {
      "key": "b",
      "type": "nested",
      "children": [
        {
          "key": "c",
          "type": "changed",
          "oldValue": "nested",
          "newValue": 5
        }
      ]
    },
    {
      "key": "or",
      "type": "changed",
      "oldValue": "change this",
      "newValue": "wanna some milk?"
    },
    {
      "key": "y",
      "type": "deleted",
      "oldValue": {
        "delete": "it"
      }
    },
    {
      "key": "z",
      "type": "unchanged",
      "value": true
    }
  ]
  ```
  </details>
</details>

## CLI-application

_If you want to use it right in your terminal, here's some documentation and exmaples for you._

### Help

Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version          output the version number
  -f, --format <type>    output format, by default "pretty" (default: "pretty")
  -n, --sign <type>      sign used for formatting identations. By default, " " (one space) (default: " ")
  -s, --spaces <number>  count of spaces in pretty format, by default 4 for pretty format and 0 for json.
  -t, --sort <boolean>   sort output by keys. By default, true. (default: "true")
  -h, --help             display help for command

### Example
  
  _gendiff -n _ ./__fixtures__/1.json ./__fixtures__/2.json_
  
  ![make me pretty](./img/pretty.png?raw=true)

  _gendiff -f plain -t false ./__fixtures__/1.json ./__fixtures__/2.json_ and
  _gendiff -f plain ./__fixtures__/1.json ./__fixtures__/2.json_

  ![make me plain](./img/plain.png?raw=true)
  
  _gendiff -f json ./__fixtures__/1.json ./__fixtures__/2.json_

  ![make me json](./img/json_default.png?raw=true)

  _gendiff -f json -s 2 ./__fixtures__/1.json ./__fixtures__/2.json_

  ![make me pretty json](./img/json_spaces.png?raw=true)
