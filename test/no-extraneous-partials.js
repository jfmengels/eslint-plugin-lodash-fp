import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-extraneous-partials';

import {code} from './helpers';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

function errors(message) {
  return [{
    ruleId: 'no-extraneous-partials',
    message
  }];
}

ruleTester.run('no-extraneous-partials', rule, {
  valid: [
    code('_.get(a, b);'),
    code('_.getOr(a, b);'),
    code('_.getOr(a, b, c);'),
    code('_.flow(a, b, c, d, e, f)(g);'),
      // Should ignore unknown methods
    code('_.foo(a)(b);'),
      // Should ignore non-Lodash methods
    code('foo(a)(b);')
  ],
  invalid: [
    {
      code: code('_.get(a)(b);'),
      errors: errors('`get` should be called without an intermediate partial.')
    },
    {
      code: 'import {map as m} from "lodash/fp"; m(a)(b);',
      errors: errors('`map` should be called without an intermediate partial.')
    }
  ]
});
