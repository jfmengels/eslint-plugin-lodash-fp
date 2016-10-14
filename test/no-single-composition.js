import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-single-composition';

import {code} from './helpers';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = {
  ruleId: 'no-single-composition'
};

ruleTester.run('no-single-composition', rule, {
  valid: [
    code(`flow(fn1, fn2);`, ['flow']),
    code(`_.flow(fn1, fn2);`),
    code(`_.flow(...fns);`),
    code(`pipe(fn1, fn2);`, ['pipe']),
    code(`_.pipe(fn1, fn2);`),
    code(`_.pipe(...fns);`),
    code(`flowRight(fn1, fn2);`, ['flowRight']),
    code(`_.flowRight(fn1, fn2);`),
    code(`_.flowRight(...fns);`),
    code(`compose(fn1, fn2);`, ['compose']),
    code(`_.compose(fn1, fn2);`),
    code(`_.compose(...fns);`),
    code(`flow(fn);`),
    code(`pipe(fn);`),
    code(`flowRight(fn);`),
    code(`compose(fn);`),
    `import find from 'lodash/fp/find'; find();`
  ],
  invalid: [
    {
      code: code(`flow(fn);`, ['flow']),
      errors: [{
        ...error, message: '`flow` should have at least two arguments'
      }]
    },
    {
      code: code(`_.flow(fn);`),
      errors: [{
        ...error, message: '`flow` should have at least two arguments'
      }]
    },
    {
      code: code(`pipe(fn);`, ['pipe']),
      errors: [{
        ...error, message: '`pipe` should have at least two arguments'
      }]
    },
    {
      code: code(`_.pipe(fn);`),
      errors: [{
        ...error, message: '`pipe` should have at least two arguments'
      }]
    },
    {
      code: code(`flowRight(fn);`, ['flowRight']),
      errors: [{
        ...error, message: '`flowRight` should have at least two arguments'
      }]
    },
    {
      code: code(`_.flowRight(fn);`),
      errors: [{
        ...error, message: '`flowRight` should have at least two arguments'
      }]
    },
    {
      code: code(`compose(fn);`, ['compose']),
      errors: [{
        ...error, message: '`compose` should have at least two arguments'
      }]
    },
    {
      code: code(`_.compose(fn);`),
      errors: [{
        ...error, message: '`compose` should have at least two arguments'
      }]
    },
    {
      code: code(`_.compose();`),
      errors: [{
        ...error, message: '`compose` should have at least two arguments'
      }]
    },
    {
      code: `import {compose as c} from 'lodash/fp'; c(fn);`,
      errors: [{
        ...error, message: '`compose` should have at least two arguments'
      }]
    },
    {
      code: `var {c: compose} = require('lodash/fp'); c(fn);`,
      errors: [{
        ...error, message: '`compose` should have at least two arguments'
      }]
    },
    {
      code: `import compose from 'lodash/fp/compose'; compose(fn);`,
      errors: [{
        ...error, message: '`compose` should have at least two arguments'
      }]
    },
    {
      code: `var compose = require('lodash/fp/compose'); compose(fn);`,
      errors: [{
        ...error, message: '`compose` should have at least two arguments'
      }]
    },
    {
      code: `import compose from 'lodash/compose'; compose(fn);`,
      errors: [{
        ...error, message: '`compose` should have at least two arguments'
      }]
    },
    {
      code: `var compose = require('lodash/compose'); compose(fn);`,
      errors: [{
        ...error, message: '`compose` should have at least two arguments'
      }]
    }
  ]
});
