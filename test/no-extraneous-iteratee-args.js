import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-extraneous-iteratee-args';

import {code} from './helpers';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = (message) => ({
  ruleId: 'prefer-composition-grouping',
  message
});

ruleTester.run('no-extraneous-iteratee-args', rule, {
  valid: [
    code('_.map();'),
    code('_.map(f);'),
    code('_.map(f, a);'),
    code('_.map(x => x, a);'),
    code('_.map(function(x) { x }, a);'),
    code('_.pluck();'),
    code('_.pluck(f);'),
    code('_.pluck(f, a);'),
    code('_.pluck(x => x, a);'),
    code('_.pluck(function(x) { x }, a);'),
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
      errors: [error('Too many parameters in `map`\'s iteratee, it is only given 1 argument.')]
    },
    {
      code: code('_.map((x, y, z) => x + y);'),
      errors: [error('Too many parameters in `map`\'s iteratee, it is only given 1 argument.')]
    },
    {
      code: code('_.map((x, y) => x + y, array);'),
      errors: [error('Too many parameters in `map`\'s iteratee, it is only given 1 argument.')]
    },
    {
      code: code('_.map((x, y) => {}, array);'),
      errors: [error('Too many parameters in `map`\'s iteratee, it is only given 1 argument.')]
    },
    {
      code: code('_.map(function (x, y) {}, array);'),
      errors: [error('Too many parameters in `map`\'s iteratee, it is only given 1 argument.')]
    },
    {
      code: code('_.reduce((x, y, z) => {}, array);'),
      errors: [error('Too many parameters in `reduce`\'s iteratee, it is only given 2 argument.')]
    },
    {
      code: code('_.pluck((x, y) => x + y);'),
      errors: [error('Too many parameters in `pluck`\'s iteratee, it is only given 1 argument.')]
    }
  ]
});
