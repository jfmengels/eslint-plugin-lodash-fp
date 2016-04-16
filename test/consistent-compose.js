import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/consistent-compose';

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
  ruleId: 'consistent-compose'
};

test(() => {
  ruleTester.run('consistent-compose', rule, {
    valid: [
      {
        code: code(`flow(fn1, fn2)(x);`, ['flow']),
        options: ['flow']
      },
      {
        code: code(`pipe(fn1, fn2)(x);`, ['pipe']),
        options: ['pipe']
      },
      {
        code: code(`compose(fn1, fn2)(x);`, ['compose']),
        options: ['compose']
      },
      {
        code: code(`flowRight(fn1, fn2)(x);`, ['flowRight']),
        options: ['flowRight']
      },
      {
        code: code(`_.flow(fn1, fn2)(x);`),
        options: ['flow']
      },
      {
        code: code(`compose(fn1, fn2)(x);`, false),
        options: ['flow']
      }
    ],
    invalid: [
      {
        code: code(`compose(fn1, fn2)(x);`, ['compose']),
        options: ['flow'],
        errors: [{
          ...error, message: 'Forbidden use of `compose`. Use `flow` instead'
        }]
      },
      {
        code: code(`pipe(fn1, fn2)(x);`, ['pipe']),
        options: ['flow'],
        errors: [{
          ...error, message: 'Forbidden use of `pipe`. Use `flow` instead'
        }]
      },
      {
        code: code(`flowRight(fn1, fn2)(x);`, ['flowRight']),
        options: ['flow'],
        errors: [{
          ...error, message: 'Forbidden use of `flowRight`. Use `flow` instead'
        }]
      },
      {
        code: code(`flow(fn1, fn2)(x);`, ['flow']),
        options: ['compose'],
        errors: [{
          ...error, message: 'Forbidden use of `flow`. Use `compose` instead'
        }]
      },
      {
        code: code(`_.compose(fn1, fn2)(x);`),
        options: ['flow'],
        errors: [{
          ...error, message: 'Forbidden use of `compose`. Use `flow` instead'
        }]
      },
      {
        code: code(`import {compose} from 'lodash'; compose(fn1, fn2)(x);`, false),
        options: ['flow'],
        errors: [{
          ...error, message: 'Forbidden use of `compose`. Use `flow` instead'
        }]
      },
      {
        code: code(`var {compose} = require('lodash/fp'); compose(fn1, fn2)(x);`, false),
        options: ['flow'],
        errors: [{
          ...error, message: 'Forbidden use of `compose`. Use `flow` instead'
        }]
      },
      {
        code: code(`import {compose as c} from 'lodash/fp'; c(fn1, fn2)(x);`, false),
        options: ['flow'],
        errors: [{
          ...error, message: 'Forbidden use of `compose`. Use `flow` instead'
        }]
      },
      {
        code: code(`var {c: compose} = require('lodash/fp'); c(fn1, fn2)(x);`, false),
        options: ['flow'],
        errors: [{
          ...error, message: 'Forbidden use of `compose`. Use `flow` instead'
        }]
      }
    ]
  });
});
