import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/prefer-get';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const errors = [{
  ruleId: 'prefer-get',
  message: 'Prefer `_.get` or `_.has` over an `&&` chain'
}];

ruleTester.run('prefer-get', rule, {
  valid: [
    `var x = _.get(a, 'b.c');`,
    `var x = _.has(a, 'b.c');`,
    `var x = a && a.b`,
    `a && a.b && f()`,
    `a && a[v] && a[v].c`,
    `a && a.b && typeof a.b === 'number'`,
    `a && a.b && a.b.c + a.b.d`
  ],
  invalid: [
    {
      code: `x = a && a.b && a.b.c === 8`,
      errors
    },
    {
      code: `x = a && a.b && a['b'].c && a.b.c.d`,
      errors
    },
    {
      code: `x = a && a.b`,
      errors,
      options: [2]
    },
    {
      code: `x = a && a.b && a.b.c && a.b.c.d`,
      errors,
      options: [2]
    }
  ]
});
