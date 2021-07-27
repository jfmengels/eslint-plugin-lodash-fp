import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-for-each';
import {code} from './helpers';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const errors = name => [{
  ruleId: 'no-for-each',
  message: 'Forbidden use of `_.' + name + '`'
}];

ruleTester.run('no-for-each', rule, {
  valid: [
    `import {toString} from './helpers'; toString();`
  ],
  invalid: [
    {
      code: code(`_.forEach(fn, array);`),
      errors: errors('forEach')
    }
  ]
});
