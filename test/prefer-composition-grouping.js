import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/prefer-composition-grouping';

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
  ruleId: 'prefer-composition-grouping',
  message: 'Prefer `_.flatMap` over consecutive `_.map` and `_.flatten`'
}];

test(() => {
  ruleTester.run('prefer-composition-grouping', rule, {
    valid: [
      code('_.flow(_.flatten, _.map(f));'),
      code('_.flow(_.filter(f1), _.map(f2));'),
      code('_.flow(_.filter(f1), _.reject(f2));'),
      code('_.flow(_.map(f1), _.filter(f2), _.map(f3));'),
      code('_.flow(_.flatten, _.flatten);'),
      code('_.flow(_.flatten, _.flatten);')
    ],
    invalid: [
      {
        code: code('_.flow(_.map(f1), _.map(f2));'),
        errors: errors
      },
      {
        code: code('_.flow(_.filter(f1), _.filter(f2));'),
        errors: errors
      },
      {
        code: code('_.flow(_.reject(f1), _.reject(f2));'),
        errors: errors
      },
      {
        code: code('_.flow(_.map(f1), _.filter(f2), _.filter(f3));'),
        errors: errors
      }
    ]
  });
});
