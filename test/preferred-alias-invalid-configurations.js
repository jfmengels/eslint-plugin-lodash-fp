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
      invalid: [],
      valid: [
        {
          code: code('foo'),
          options: [{overrides: ['matchesProperty', 'propEq']}],
          errors: [{message: 'ok'}]
        }
      ]
    });
  }, 'Error while loading rule \'preferred-alias\': `override` contains `matchesProperty` and `propEq` that target `matchesProperty`');
});
