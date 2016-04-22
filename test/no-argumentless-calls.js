import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/no-argumentless-calls';

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
  ruleId: 'no-argumentless-calls',
  message: `No call without arguments`
}];

test(() => {
  ruleTester.run('no-argumentless-calls', rule, {
    valid: [
      code('foo()'),
      code('_.map(foo)'),
      code(`_.flow(_.map(f1), _.flatten)`)
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
});
