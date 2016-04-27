import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/prefer-constant';

const ruleTester = new RuleTester({
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const errors = [{
  ruleId: 'prefer-constant',
  message: 'Prefer `_.constant` over a function returning a literal'
}];

test(() => {
  ruleTester.run('prefer-constant', rule, {
    valid: [
      'var x = function() { return f();};',
      'var x = function() {return [y]};',
      'var x = function() {return {a: y}};',
      'var x = function() {return y ? 1 : 2};',
      'var x = function() {return true ? 1 : x};',
      {
        code: 'var x = function() { return {[y]: 1}};',
        parserOptions: {ecmaVersion: 6}
      },
      {
        code: 'var x = () => 1;',
        parserOptions: {ecmaVersion: 6},
        options: [{arrowFunctions: false}]
      },
      {
        code: 'var x = () => {return 1; };',
        parserOptions: {ecmaVersion: 6},
        options: [{arrowFunctions: false}]
      }
    ],
    invalid: [
      {
        code: 'var x = function() { return 1; };',
        errors
      },
      {
        code: 'var x = function() { return 1 + 1; };',
        errors
      },
      {
        code: 'var x = function() { return typeof 1; };',
        errors
      },
      {
        code: 'var x = () => 1;',
        parserOptions: {ecmaVersion: 6},
        options: [{arrowFunctions: true}],
        errors
      },
      {
        code: 'var x = () => { return 1; };',
        parserOptions: {ecmaVersion: 6},
        options: [{arrowFunctions: true}],
        errors
      },
      {
        code: 'function one() { return 1; }',
        errors
      }
    ]
  });
});
