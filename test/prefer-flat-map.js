import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/prefer-flat-map';

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
  ruleId: 'prefer-flat-map',
  message: 'Prefer `_.flatMap` over consecutive `_.map` and `_.flatten`'
}];

ruleTester.run('prefer-flat-map', rule, {
  valid: [
    code('_.map(f, a);'),
    code('_.flatMap(f, a);'),
    code('_.flatten(2);'),
    code('_.flatten(map(f));'),
    code('_.compose(_.map(f), _.flatten);'),
    code('_.flow(_.flatten, _.map(f));'),
    code('_.flow(_.flatten, _.flatten);')
  ],
  invalid: [
    {
      code: code('_.flatten(_.map(f, a));'),
      errors: errors
    },
    {
      code: code('flatten(map(f, a));', ['flatten', 'map']),
      errors: errors
    },
    {
      code: `import {flatten as f, map as m} from 'lodash/fp'; f(m(f1, a));`,
      errors: errors
    },
    {
      code: code('_.flatten(_.map(f));'),
      errors: errors
    },
    {
      code: code('_.flatten(_.map(f))(a);'),
      errors: errors
    },
    {
      code: code('_.flow(_.map(f), _.flatten);'),
      errors: errors
    },
    {
      code: code('_.compose(_.flatten, _.map(f));'),
      errors: errors
    },
    {
      code: code('_.flow(_.map(f), _.map(f1), _.flatten);'),
      errors: errors
    },
    {
      code: code('_.flow(_.map(f), _.filter(f1), _.map(f2), _.flatten);'),
      errors: errors
    },
    {
      code: code('_.flow(_.map(f), foo, _.map(f1), _.flatten);'),
      errors: errors
    },
    {
      code: code('_.flow(_.flatten, _.map(f), _.map(f1), _.flatten);'),
      errors: errors
    }
  ]
});
