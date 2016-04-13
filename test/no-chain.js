import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/no-chain';

import {code} from './helpers';

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
      code(`foo(a);`),
      code(`_.filter(fn, array).map(fn);`),
      code(`_(x);`, false),
      code(`_.chain(x);`, false),
      code(`_(x);`, 'fp')
    ],
    invalid: [
      {
        code: code(`_(x);`),
        errors
      }, {
        code: code(`_(x).map(fn).value();`),
        errors
      }, {
        code: code(`_.chain(x);`),
        errors
      }, {
        code: code(`_.chain(x).map(fn).value();`),
        errors
      }, {
        code: code(`fp.chain(x).map(fn).value();`, 'fp'),
        errors
      }, {
        code: code(`chain(x);`, ['chain']),
        errors
      }, {
        code: code(`import _ from 'lodash'; _(x);`, false),
        errors
      }, {
        code: code(`import _ from 'lodash'; _.chain(x);`, false),
        errors
      }, {
        code: code(`import {chain} from 'lodash'; chain(x);`, false),
        errors
      }, {
        code: code(`import chain from 'lodash/fp/chain'; chain(x);`, false),
        errors
      }, {
        code: code(`import chain from 'lodash/chain'; chain(x);`, false),
        errors
      }
    ]
  });
});
