import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/preferred-alias';

import {code} from './helpers';

const ruleTester = new RuleTester({
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

function errors(message) {
  return [{
    ruleId: 'preferred-alias',
    message: message
  }];
}

test(() => {
  ruleTester.run('preferred-alias', rule, {
    valid: [
      code('_.map(a, b);'),
      code('_.set(a, b);'),
      code('_.at(a, b);'),
      code('_.get(a, b);'),
      code('_.getOr(a, b);'),
      code('_.foo(a, b);'),
      code('foo(a, b);'),
      code('foo(a, b);', ['foo']),
      {
        code: code('_.pluck(a, b, c);'),
        options: [{overrides: ['pluck']}]
      }
    ],
    invalid: [
      {
        code: code('_.pluck(a, b, c);'),
        errors: errors('Use `map` instead of `pluck`.')
      },
      {
        code: code('_.assoc(a, b, c);'),
        errors: errors('Use `set` instead of `assoc`.')
      },
      {
        code: code('_.paths(a, b, c);'),
        errors: errors('Use `at` instead of `paths`.')
      },
      {
        code: code('_.path(a, b, c);'),
        errors: errors('Use `get` instead of `path`.')
      },
      {
        code: code('_.pathEq(a, b, c);'),
        errors: errors('Use `matchesProperty` instead of `pathEq`.')
      },
      {
        code: code('_.propEq(a, b, c);'),
        errors: errors('Use `matchesProperty` instead of `propEq`.')
      },
      {
        code: code('pluck(a, b, c);', ['pluck']),
        errors: errors('Use `map` instead of `pluck`.')
      },
      {
        code: code('_.map(a, b, c);'),
        errors: errors('Use `pluck` instead of `map`.'),
        options: [{overrides: ['pluck']}]
      },
      {
        code: code('_.matchesProperty(a, b, c);'),
        options: [{overrides: ['pathEq']}],
        errors: errors('Use `pathEq` instead of `matchesProperty`.')
      },
      {
        code: code('_.propEq(a, b, c);'),
        options: [{overrides: ['pathEq']}],
        errors: errors('Use `pathEq` instead of `propEq`.')
      },
      {
        code: code('_.matchesProperty(a, b, c);'),
        options: [{overrides: ['propEq']}],
        errors: errors('Use `propEq` instead of `matchesProperty`.')
      },
      {
        code: code('_.pathEq(a, b, c);'),
        options: [{overrides: ['propEq']}],
        errors: errors('Use `propEq` instead of `pathEq`.')
      }
    ]
  });
});

test('Invalid configurations', t => {
  t.throws(() => {
    ruleTester.run('preferred-alias', rule, {
      valid: [],
      invalid: [
        {
          code: code('foo'),
          options: [{overrides: ['propEq', 'pathEq']}],
          errors: []
        }
      ]
    });
  }, 'Error while loading rule \'preferred-alias\': `override` contains `propEq` and `pathEq` that target `matchesProperty`');

  t.throws(() => {
    ruleTester.run('preferred-alias', rule, {
      valid: [],
      invalid: [
        {
          code: code('foo'),
          options: [{overrides: ['matchesProperty', 'propEq']}],
          errors: []
        }
      ]
    });
  }, 'Error while loading rule \'preferred-alias\': `override` contains `matchesProperty` and `propEq` that target `matchesProperty`');
});
