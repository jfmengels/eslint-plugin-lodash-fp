import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/prefer-compact';

import {code} from './helpers';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const errors = [{
  ruleId: 'prefer-compact',
  message: 'Prefer `_.compact` over `_.filter` with identity function'
}];

ruleTester.run('prefer-compact', rule, {
  valid: [
    code('_.filter(f, a);'),
    code('_.flow(_.map(f1), _.filter(f2));'),
    code('array.filter(f1);')
  ],
  invalid: [
    {
      code: code('_.filter(_.identity, a);'),
      errors
    },
    {
      code: code('_.flow(_.map(f1), _.filter(_.identity));'),
      errors
    },
    {
      code: code('_.filter(x => x, a);'),
      errors
    },
    {
      code: code('_.flow(_.map(f1), _.filter(x => x));'),
      errors
    },
    {
      code: code('_.filter((x) => { return x; }, a);'),
      errors
    },
    {
      code: code('_.flow(_.map(f1), _.filter((x) => { return x; }));'),
      errors
    },
    {
      code: code('_.filter(function(x) { return x; }, a);'),
      errors
    },
    {
      code: code('_.flow(_.map(f1), _.filter(function(x) { return x; }));'),
      errors
    }
  ]
});
