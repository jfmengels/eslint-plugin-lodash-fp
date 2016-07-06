import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/prefer-composition-grouping';

import {code} from './helpers';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = message => ({
  ruleId: 'prefer-composition-grouping',
  message
});

ruleTester.run('prefer-composition-grouping', rule, {
  valid: [
    code('_.flow(_.flatten, _.map(f));'),
    code('_.flow(_.filter(f1), _.map(f2));'),
    code('_.flow(_.filter(f1), _.reject(f2));'),
    code('_.flow(_.map(f1), _.filter(f2), _.map(f3));'),
    code('_.flow(_.map(f1), f2, _.map(f3));'),
    code('_.flow(_.flatten, _.flatten);'),
    code('_.flow(fn1, fn2);'),
    code('_.flow((a) => a - 1, (b) => b + 1);')
  ],
  invalid: [
    {
      code: code('_.flow(_.map(f1), _.map(f2));'),
      errors: [error('Prefer regrouping successive calls of `map` into one function or function call')]
    },
    {
      code: code('_.flow(_.filter(f1), _.filter(f2));'),
      errors: [error('Prefer regrouping successive calls of `filter` into one function or function call. You might want to use `overEvery`')]
    },
    {
      code: code('_.flow(_.reject(f1), _.reject(f2));'),
      errors: [error('Prefer regrouping successive calls of `reject` into one function or function call. You might want to use `overSome`')]
    },
    {
      code: code('_.flow(_.map(f1), _.filter(f2), _.filter(f3));'),
      errors: [error('Prefer regrouping successive calls of `filter` into one function or function call. You might want to use `overEvery`')]
    },
    {
      code: code('_.flow(_.map(f1), _.map(f2), _.filter(f3), _.filter(f4));'),
      errors: [
        error('Prefer regrouping successive calls of `map` into one function or function call'),
        error('Prefer regrouping successive calls of `filter` into one function or function call. You might want to use `overEvery`')
      ]
    },
    {
      code: code('_.flow(_.pluck(f1), _.pluck(f2));'),
      errors: [error('Prefer regrouping successive calls of `pluck` into one function or function call')]
    },
    {
      code: code('_.flow(_.pluck(f1), _.map(f2));'),
      errors: [error('Prefer regrouping successive calls of `map` into one function or function call')]
    },
    {
      code: code('_.flow(_.map(f1), _.pluck(f2));'),
      errors: [error('Prefer regrouping successive calls of `pluck` into one function or function call')]
    }
  ]
});
