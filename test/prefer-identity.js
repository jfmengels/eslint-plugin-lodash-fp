import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/prefer-identity';

const ruleTester = new RuleTester({
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const errors = [{
  ruleId: 'prefer-identity',
  message: 'Prefer `_.identity` over a function returning its argument'
}];

test(() => {
  ruleTester.run('prefer-identity', rule, {
    valid: [
      'function foo() { console.log(x); return x; }',
      'function foo() { return f(); }',
      'function foo(x, y) { return x; }',
      'function foo(x, y) { return y; }',
      'function foo(x) { return f(); }',
      'function foo(x) { return f(x); }',
      'function foo(x) { return y; }',
      'var foo = function(x) { return y; }',
      '(x) => { return y; };',
      '(x) => { return f(x); };',
      '(x) => y;',
      '(x) => { return x; }',
      '(x) => x',
      '[1, 2, 3].filter(x => x)'
    ],
    invalid: [
      {
        code: 'function foo(x) { return x; }',
        errors
      },
      {
        code: 'var foo = function(x) {return x;}',
        errors
      },
      {
        code: 'var foo = function(x) {return x;}',
        errors
      },
      {
        code: '[1, 2, 3].filter(function(x) { return x; })',
        errors
      },
      {
        code: '(x) => { return x; }',
        options: [{arrowFunctions: true}],
        errors
      },
      {
        code: '(x) => x',
        options: [{arrowFunctions: true}],
        errors
      },
      {
        code: '[1, 2, 3].filter(x => x)',
        options: [{arrowFunctions: true}],
        errors
      }
    ]
  });
});
