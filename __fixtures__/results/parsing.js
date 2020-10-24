const parsedObj = {
  i: 'do not mind',
  if: 'you',
  could: ['read', 'this'],
  but: {
    why: 'do you',
    need: {
      to: 'know everything?',
    },
  },
  just: 'beat it!',
  my: 'job is',
  d: 1,
  zapp: {
    brannigan: 'leela',
  },
  zoidberg: {
    wants: {
      to: 'eat',
    },
  },
};

const ast = [
  {
    key: 'but',
    type: 'nested',
    children: [
      {
        key: 'need',
        type: 'nested',
        children: [
          {
            key: 'to',
            type: 'changed',
            oldValue: 'know everything?',
            newValue: 'be worried?',
          },
        ],
      },
      {
        key: 'why',
        type: 'changed',
        oldValue: 'do you',
        newValue: 'am I',
      },
    ],
  },
  {
    key: 'could',
    type: 'deleted',
    oldValue: ['read', 'this'],
  },
  {
    key: 'd',
    type: 'changed',
    oldValue: 1,
    newValue: 8,
  },
  {
    key: 'i',
    type: 'changed',
    oldValue: 'do not mind',
    newValue: 'do mind',
  },
  {
    key: 'if',
    type: 'unchanged',
    value: 'you',
  },
  {
    key: 'just',
    type: 'changed',
    oldValue: 'beat it!',
    newValue: 'want to beat it!',
  },
  {
    key: 'my',
    type: 'deleted',
    oldValue: 'job is',
  },
  {
    key: 'would',
    type: 'added',
    newValue: ['read', 'this', 'message'],
  },
  {
    key: 'your',
    type: 'added',
    newValue: 'job is',
  },
  {
    key: 'zapp',
    type: 'deleted',
    oldValue: [
      {
        key: 'brannigan',
        type: 'unchanged',
        value: 'leela',
      },
    ],
  },
  {
    key: 'zoidberg',
    type: 'changed',
    oldValue: [
      {
        key: 'wants',
        type: 'nested',
        children: [
          {
            key: 'to',
            type: 'unchanged',
            value: 'eat',
          },
        ],
      },
    ],
    newValue: 'the doctor',
  },
];

export {
  parsedObj,
  ast,
};
