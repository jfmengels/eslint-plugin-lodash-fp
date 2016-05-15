import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/no-for-each';

import {code} from './helpers';

const ruleTester = new RuleTester({
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const errors = (name) => [{
  ruleId: 'no-for-each',
  message: 'Forbidden use of `_.' + name + '`'
}];

test(() => {
  ruleTester.run('no-for-each', rule, {
    valid: [
      code(`foo(a);`),
      code(`_.map(fn, array).filter(fn2);`),
      {
        code: code(`_.map(fn, array).forEach(fn2);`),
        options: [{noNative: false}]
      },
      {
        code: code(`array.forEach(fn);`),
        options: [{noNative: false}]
      }
    ],
    invalid: [
      {
        code: code(`_.forEach(fn, array);`),
        errors: errors('forEach')
      },
      {
        code: code(`_.forEach(fn, array);`),
        options: [{noNative: false}],
        errors: errors('forEach')
      },
      {
        code: code(`_.forEachRight(fn, array);`),
        errors: errors('forEachRight')
      },
      {
        code: code(`_.each(fn, array);`),
        errors: errors('forEach')
      },
      {
        code: code(`_.eachRight(fn, array);`),
        errors: errors('forEachRight')
      },
      {
        code: code(`_.forIn(fn, array);`),
        errors: errors('forIn')
      },
      {
        code: code(`_.forInRight(fn, array);`),
        errors: errors('forInRight')
      },
      {
        code: code(`_.forOwn(fn, array);`),
        errors: errors('forOwn')
      },
      {
        code: code(`_.forOwnRight(fn, array);`),
        errors: errors('forOwnRight')
      },
      {
        code: code(`_.flow(_.forEach(fn));`),
        errors: errors('forEach')
      },
      {
        code: code(`array.forEach(fn);`),
        options: [{noNative: true}],
        errors: [{
          ruleId: 'no-for-each',
          message: 'Forbidden use of native `forEach`'
        }]
      },
      {
        code: code(`_.map(fn, array).forEach(fn);`),
        options: [{noNative: true}],
        errors: [{
          ruleId: 'no-for-each',
          message: 'Forbidden use of native `forEach`'
        }]
      }
    ]
  });
});
