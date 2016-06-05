import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/no-partial-of-curried';

import {code} from './helpers';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

function errors(message) {
  return [{
    ruleId: 'no-partial-of-curried',
    message: message
  }];
}

ruleTester.run('no-partial-of-curried', rule, {
  valid: [
    code('_.get(a, b);'),
    code('_.partial;'),
    code('_.partial();'),
    code('_.partial(fn, [a, b, c]);'),
    code('_.partial(function(...x) { return x; }, [a, b, c]);'),
    code('_.partial((...x) => x, [a, b, c]);'),
    code('_.partial(_.flow, [fn1, fn2]);'),
    code('_.partialRight;'),
    code('_.partialRight();'),
    code('_.partialRight(fn, [a, b, c]);'),
    code('_.partialRight(function(...x) { return x; }, [a, b, c]);'),
    code('_.partialRight((...x) => x, [a, b, c]);'),
    code('_.partialRight(_.flow, [fn1, fn2]);')
  ],
  invalid: [
    {
      code: code('_.partial(_.get, [a]);'),
      errors: errors('Foo')
    },
    {
      code: code('_.partial(_.map, [a]);'),
      errors: errors('Foo')
    },
    {
      code: code('_.partial(_.map, [_, a]);'),
      errors: errors('Foo')
    },
    {
      code: code('_.partialRight(_.get, [a]);'),
      errors: errors('Foo')
    },
    {
      code: code('_.partialRight(_.map, [a]);'),
      errors: errors('Foo')
    },
    {
      code: code('_.partialRight(_.map, [_, a]);'),
      errors: errors('Foo')
    },
    {
      code: code('_.partial(_.get(b), [a]);'),
      errors: errors('Foo')
    },
    {
      code: code('_.partial(_.map(b), [a]);'),
      errors: errors('Foo')
    },
    {
      code: code('_.partial(_.map(b), [_, a]);'),
      errors: errors('Foo')
    },
    {
      code: code('_.partialRight(_.get(b), [a]);'),
      errors: errors('Foo')
    },
    {
      code: code('_.partialRight(_.map(b), [a]);'),
      errors: errors('Foo')
    },
    {
      code: code('_.partialRight(_.map(b), [_, a]);'),
      errors: errors('Foo')
    }
  ]
});
