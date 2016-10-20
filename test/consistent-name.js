import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/consistent-name';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const error = {
  ruleId: 'consistent-name'
};

ruleTester.run('consistent-name', rule, {
  valid: [
    `import _ from 'lodash';`,
    `import _ from 'lodash/fp';`,
    `import {bindAll} from 'lodash/fp';`,
    `import _, {bindAll} from 'lodash/fp';`,
    `import _, {bindAll as b} from 'lodash/fp';`,
    `import _ from 'lodash/fp/bindAll';`,
    `var _ = require('lodash');`,
    `var _ = require('lodash/fp');`,
    `var {find} = require('lodash');`,
    `import foo from 'foo';`,
    `var foo = require('foo');`,
    `var foo = require(fooName);`,
    {
      code: `import lodash from 'lodash';`,
      options: ['lodash']
    },
    {
      code: `import fp from 'lodash/fp';`,
      options: ['fp']
    }
  ],
  invalid: [
    {
      code: `import lodash from 'lodash';`,
      errors: [{
        ...error, message: 'Lodash should be imported as `_`'
      }]
    },
    {
      code: `import _ from 'lodash/fp';`,
      options: ['fp'],
      errors: [{
        ...error, message: 'Lodash should be imported as `fp`'
      }]
    },
    {
      code: `var lodash = require('lodash');`,
      errors: [{
        ...error, message: 'Lodash should be imported as `_`'
      }]
    }
  ]
});
