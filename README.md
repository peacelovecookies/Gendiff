# frontend-project-lvl2
![Node CI](https://github.com/peacelovecookies/frontend-project-lvl2/workflows/Node%20CI/badge.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/4bb889005323f929a5be/maintainability)](https://codeclimate.com/github/peacelovecookies/frontend-project-lvl2/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/4bb889005323f929a5be/test_coverage)](https://codeclimate.com/github/peacelovecookies/frontend-project-lvl2/test_coverage)

---

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
    
`diff` (_String_): difference between two files. Format of output depends on format option.

### Example



## CLI (in-terminal bin)

_If you want to use it right in your terminal, here's some documentation and exmaples for you._

