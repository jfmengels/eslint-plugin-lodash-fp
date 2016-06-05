import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-argumentless-calls';

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
  ruleId: 'no-argumentless-calls',
  message: `No call without arguments`
}];

ruleTester.run('no-argumentless-calls', rule, {
  valid: [
    code('foo()'),
    code('_.map(foo)'),
    code(`_.flow(_.map(f1), _.flatten)`),
      // Exceptions
    code('_.uniqueId()'),
    code('_.now()'),
    code('_.noConflict()'),
    code('_.runInContext()')
  ],
  invalid: [
    {
      code: code(`_.flatten()`),
      errors: errors
    },
    {
      code: code(`_.map()`),
      errors: errors
    },
    {
      code: code(`map()`, ['map']),
      errors: errors
    },
    {
      code: code(`_.flow(_.map(f1), _.flatten())`),
      errors: errors
    }
  ]
});
