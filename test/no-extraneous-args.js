import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/no-extraneous-args';

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
    ruleId: 'no-extraneous-args',
    message: message
  }];
}

test(() => {
  ruleTester.run('no-extraneous-args', rule, {
    valid: [
      code('_.get(a, b);'),
      code('_.getOr(a, b);'),
      code('_.getOr(a, b, c);'),
      // Should ignore when there are not enough arguments
      code('_.get(a);'),
      // Should ignore methods that are not capped
      code('_.flow(a, b, c, d, e, f, g);'),
      // should ignore unknown methods
      code('_.foo(a, b, c, d, e, f, g);'),
      // should ignore non-Lodash methods
      code('foo(a, b, c, d, e, f, g);')
    ],
    invalid: [
      {
        code: code('_.get(a, b, c);'),
        errors: errors('`get` is capped at 2 arguments. Did you mean to use `getOr`?')
      },
      {
        code: code('_.get(a, b, c, d);'),
        errors: errors('`get` is capped at 2 arguments. Did you mean to use `getOr`?')
      },
      {
        code: code('_.getOr(a, b, c, d);'),
        errors: errors('`getOr` is capped at 3 arguments.')
      },
      {
        code: code('_.concat(a, b, c);'),
        errors: errors('`concat` is capped at 2 arguments.')
      },
      {
        code: code('_.pluck(a, b, c);'),
        errors: errors('`pluck` is capped at 2 arguments.')
      },
      {
        code: code('_.partial(a, b, c);'),
        errors: errors('`partial` is capped at 2 arguments and takes an array as its last argument.')
      },
      {
        code: code('_.partialRight(a, b, c);'),
        errors: errors('`partialRight` is capped at 2 arguments and takes an array as its last argument.')
      },
      {
        code: code('_.invokeArgs(a, b, c, d);'),
        errors: errors('`invokeArgs` is capped at 3 arguments and takes an array as its last argument.')
      },
      {
        code: code('_.invokeArgs(a, b, c, d, e, f, g);'),
        errors: errors('`invokeArgs` is capped at 3 arguments and takes an array as its last argument.')
      },
      {
        code: code('_.invokeArgsMap(a, b, c, d);'),
        errors: errors('`invokeArgsMap` is capped at 3 arguments and takes an array as its last argument.')
      },
      {
        code: code('_.invokeArgsMap(a, b, c, d, e, f, g);'),
        errors: errors('`invokeArgsMap` is capped at 3 arguments and takes an array as its last argument.')
      },
      {
        code: code('_.invoke(a, b, c);'),
        errors: errors('`invoke` is capped at 2 arguments. Did you mean to use `invokeArgs`?')
      },
      {
        code: code('_.invoke(a, b, c, d, e, f);'),
        errors: errors('`invoke` is capped at 2 arguments. Did you mean to use `invokeArgs`?')
      },
      {
        code: code('_.invokeMap(a, b, c);'),
        errors: errors('`invokeMap` is capped at 2 arguments. Did you mean to use `invokeArgsMap`?')
      },
      {
        code: code('_.without(a, b, c, d);'),
        errors: errors('`without` is capped at 2 arguments and takes an array as its last argument.')
      },
      {
        code: 'import {map as m} from "lodash/fp"; m(a, b, c);',
        errors: errors('`map` is capped at 2 arguments.')
      }
    ]
  });
});
