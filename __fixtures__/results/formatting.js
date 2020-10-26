import { ast } from './parsing';

const stringFormat = `
{
    but: {
        need: {
          - to: know everything?
          + to: be worried?
        }
      - why: do you
      + why: am I
    }
  - could: [read, this]
  - d: 1
  + d: 8
  - i: do not mind
  + i: do mind
    if: you
  - just: beat it!
  + just: want to beat it!
  - my: job is
  + would: [read, this, message]
  + your: job is
  - zapp: {
        brannigan: leela
    }
  - zoidberg: {
        wants: {
            to: eat
        }
    }
  + zoidberg: the doctor
  + zun: {
        ha: hahaha
    }
}
`;

const jsonFormat = JSON.stringify(ast);

const plainFormat = `
Property 'but.need.to' was updated. From 'know everything?' to 'be worried?'
Property 'but.why' was updated. From 'do you' to 'am I'
Property 'could' was removed
Property 'd' was updated. From 1 to 8
Property 'i' was updated. From 'do not mind' to 'do mind'
Property 'just' was updated. From 'beat it!' to 'want to beat it!'
Property 'my' was removed
Property 'would' was added with value: [read, this, message]
Property 'your' was added with value: 'job is'
Property 'zapp' was removed
Property 'zoidberg' was updated. From [complex value] to 'the doctor'
Property 'zun' was added with value: [complex value]
`;

export {
  stringFormat,
  plainFormat,
  jsonFormat,
};
