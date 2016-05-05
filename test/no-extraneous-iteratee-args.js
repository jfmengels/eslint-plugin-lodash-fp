import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/no-extraneous-iteratee-args';

import {code} from './helpers';

const ruleTester = new RuleTester({
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const errors = [{
  ruleId: 'no-extraneous-iteratee-args',
  message: 'Prefer `_.flatMap` over consecutive `_.map` and `_.flatten`'
}];

test(() => {
  ruleTester.run('no-extraneous-iteratee-args', rule, {
    valid: [
      code('_.map();'),
      code('_.map(f);'),
      code('_.map(f, a);'),
      code('_.map(x => x, a);'),
      code('_.map(function(x) { x }, a);'),
      code('_.reduce(x => x, a);'),
      code('_.reduce((x, y) => x, a);'),
      code('_.times(() => 1, n);'),
      code('_.foo(() => 1, n);'),
      code('_.foo((a, b, c, d, e, f) => 1, n);'),
      code('foo((a, b, c, d, e, f) => 1, n);')
    ],
    invalid: [
      {
        code: code('_.map((x, y) => x + y);'),
        errors: errors
      },
      {
        code: code('_.map((x, y, z) => x + y);'),
        errors: errors
      },
      {
        code: code('_.map((x, y) => x + y, array);'),
        errors: errors
      },
      {
        code: code('_.map((x, y) => {}, array);'),
        errors: errors
      },
      {
        code: code('_.map(function (x, y) {}, array);'),
        errors: errors
      },
      {
        code: code('_.reduce((x, y, z) => {}, array);'),
        errors: errors
      }
    ]
  });
});
