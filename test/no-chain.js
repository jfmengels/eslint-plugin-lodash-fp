import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/no-chain';

const ruleTester = new RuleTester({
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const errors = [{
  ruleId: 'no-chain',
  message: 'Unallowed use of chain operations. Use flow/compose instead'
}];

test(() => {
  ruleTester.run('no-chain', rule, {
    valid: [
      `foo(a);`,
      `_.filter(fn, array).map(fn);`
    ],
    invalid: [
      {
        code: `_(x);`,
        errors
      }, {
        code: `_(x).map(fn).value();`,
        errors
      }, {
        code: `_.chain(x);`,
        errors
      }, {
        code: `_.chain(x).map(fn).value();`,
        errors
      }
    ]
  });
});
