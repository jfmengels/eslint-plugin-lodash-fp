import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/no-submodule-destructuring';

const ruleTester = new RuleTester({
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const errors = [{
  ruleId: 'no-submodule-destructuring',
  message: 'Import of Lodash submodule should not be destructured'
}];

test(() => {
  ruleTester.run('no-submodule-destructuring', rule, {
    valid: [
      `import _ from 'lodash/fp';`,
      `import _ from 'lodash';`,
      `import find from 'lodash/fp/find';`,
      `import find from 'lodash/find';`,
      `import {find} from 'lodash/fp';`,
      `import {find} from 'lodash';`,
      `import {find as f} from 'lodash/fp';`,
      `import {find as f} from 'lodash';`,
      `var _ = require('lodash');`,
      `var _ = require('lodash/fp');`,
      `var find = require('lodash/fp/find');`,
      `var find = require('lodash/find');`,
      `var {find} = require('lodash/fp');`,
      `var {find} = require('lodash');`,
      `var {find: f} = require('lodash');`,
      `var {find: f} = require('lodash/fp');`,
      `var foo = require('foo');`,
      `var {foo: f} = require('foo');`,
      `var foo;`,
      `var {foo} = bar;`,
      `import 'foo'`,
      `import 'lodash'`,
      `require('foo')`,
      `require('lodash')`,
      `var {find} = require('lodash/fp/' + 'find');`
    ],
    invalid: [
      {
        code: `import {find} from 'lodash/fp/find';`,
        errors
      },
      {
        code: `import {map} from 'lodash/fp/map';`,
        errors
      },
      {
        code: `import {find} from 'lodash/find';`,
        errors
      },
      {
        code: `import {find as f} from 'lodash/fp/find';`,
        errors
      },
      {
        code: `import {find as f} from 'lodash/find';`,
        errors
      },
      {
        code: `var {find} = require('lodash/find');`,
        errors
      },
      {
        code: `var {find: f} = require('lodash/find');`,
        errors
      },
      {
        code: `var {find} = require('lodash/fp/find');`,
        errors
      }
    ]
  });
});
