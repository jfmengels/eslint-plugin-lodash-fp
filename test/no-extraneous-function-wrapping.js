import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/no-extraneous-function-wrapping';

import {code} from './helpers';

const ruleTester = new RuleTester({
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = {
  ruleId: 'no-extraneous-function-wrapping',
  message: 'Found extraneous function wrap around curried method. Pass inner function directly'
};

test(() => {
  ruleTester.run('no-extraneous-function-wrapping', rule, {
    valid: [
      // Not a Lodash function
      code(`_.map(function(x) { return get('a.b.c', x); });`),
      // Iteratee does not have a parameter
      code(`_.map(function() { return _.get('a.b.c', x); });`),
      // Iteratee as more than one parameter
      code(`_.map(function(x, y) { return _.get('a.b.c', x); });`),
      code(`_.map(function(y, x) { return _.get('a.b.c', x); });`),
      // Does not use function's parameter
      code(`_.map(function(x) { return _.get('a.b.c', y); });`),
      // Does not use function's parameter as last parameter
      code(`_.map(function(x) { return _.get('a.b.c', x, y); });`),
      // Does not use function's parameter as last parameter
      code(`function foo(x) { return _.isArray(y); }`),
      // Does not return the value
      code(`function foo(x) { _.isArray(x); }`),
      // Not a call expression body
      code(`function foo(x) { return 2; }`),
      code(`_.map(x => 2);`),
      // Calling result of call with one argument but not with function's parameter
      code(`function foo(x) { return bar(x)(y); }`),
      // Uses argument somewhere else in the arguments
      code(`x => bar(x, x);`),
      code(`x => x.bar(x);`),
      code(`x => x(x);`),
      code(`x => _.get(x)(x);`),
      code(`x => bar(x)(x);`),
      code(`x => bar(x.a)(x);`),
      code(`x => bar(x * 2)(x);`),
      code(`x => bar(v => x || 2)(x);`),
      code(`x => bar(v => x ? 1 : 2)(x);`),
      code(`x => bar(v => 1 ? x : 2)(x);`),
      code(`x => bar(v => +x)(x);`),
      code(`x => bar(v => !x)(x);`),
      code(`x => bar(f => x)(x);`),
      code(`x => bar(f => x())(x);`),
      code(`x => bar(f => { x; })(x);`),
      code('x => bar(f => { `${x}` })(x);'),
      code(`x => bar(f => { [x]; })(x);`),
      code(`x => bar(f => { b = {a: x}; })(x);`),
      code(`x => bar(f => { var b = x; })(x);`),
      code(`x => bar(f => { return x; })(x);`),
      code(`x => bar(function() { return x; })(x);`),
      code(`x => bar(f => {
        if (x) {
          2;
        }
      })(x);`),
      code(`x => bar(f => {
        for (x in b) {
          2
        }
      })(x);`),
      code(`x => bar(f => {
        for (x = 0; a < b; a++) {
          2
        }
      })(x);`),
      code(`x => bar(f => {
        for (a = 0; a < b; x++) {
          2
        }
      })(x);`),
      // Method is not curried
      code(`x => flow(y, x);`, ['flow']),
      code(`x => _.flow(y, x);`),
      code(`x => _.pipe(y, x);`),
      code(`x => _.flowRight(y, x);`),
      code(`x => _.compose(y, x);`),
      code(`x => _.castArray(y, x);`),
      code(`x => _.iteratee(y, x);`),
      code(`x => _.mixin(y, x);`),
      code(`x => _.runInContext(y, x);`)
    ],
    invalid: [
      {
        code: code(`_.map(function(x) { return _.get('a.b.c', x); });`),
        errors: [error]
      },
      {
        code: code(`_.map(function(x) { return _.isArray(x); });`),
        errors: [error]
      },
      {
        code: code(`function foo(x) { return _.isArray(x); }`),
        errors: [error]
      },
      {
        code: code(`_.map(x => _.isArray(x));`),
        errors: [error]
      },
      {
        code: code(`_.map(x => { return _.isArray(x); })`),
        errors: [error]
      },
      {
        code: code(`_.map(x => { return _.isArray(x); }, x => { return _.isArray(x); })`),
        errors: [error, error]
      },
      {
        code: code(`function foo(x) { return _.get('a.b.c', x); }`),
        errors: [error]
      },
      {
        code: code(`function foo(x) { return _.get('a.b.c')(x); }`),
        errors: [error]
      },
      {
        code: code(`function foo(x) { return bar(y)(x); }`),
        errors: [error]
      },
      {
        code: code(`function foo(x) { return bar(a.x)(x); }`),
        errors: [error]
      },
      {
        code: code(`function foo(x) { return bar(x => x)(x); }`),
        errors: [error]
      }
    ]
  });
});
