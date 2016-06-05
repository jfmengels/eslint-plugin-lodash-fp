import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-unused-result';

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
  ruleId: 'no-unused-result',
  message: 'Unused expression'
}];

ruleTester.run('no-unused-result', rule, {
  valid: [
    code(`foo(a);`),
    code(`var res = _.filter(fn, array);`),
    code(`function a() { return _.filter(fn, array).map(fn); }`),
    code(`var doStuff = _.flow(_.filter(fn), _.map(fn2));`),
    code(`var updated = _.set('a.b.c', 1000, obj);`),
    code(`_.map(fn, array).forEach(console.log);`),
    code(`foo(_.filter(fn, array));`),
      // Exceptions
    code(`_.forEach(fn);`),
    code(`_.forEachRight(fn);`),
    code(`_.each(fn);`),
    code(`_.eachRight(fn);`),
    code(`_.forIn(fn);`),
    code(`_.forInRight(fn);`),
    code(`_.forOwn(fn);`),
    code(`_.forOwnRight(fn);`)
  ],
  invalid: [
    {
      code: code(`_.set('a.b.c', 1000, obj);`),
      errors
    },
    {
      code: code(`_.set('a.b.c')(1000)(obj);`),
      errors
    },
    {
      code: code(`_.filter(fn, array);`),
      errors
    },
    {
      code: code(`_.flow(_.filter(fn), _.map(fn2));`),
      errors
    }
  ]
});
