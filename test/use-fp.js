import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import rule from '../rules/use-fp';

const ruleTester = avaRuleTester(test, {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  }
});

const errors = [{
  ruleId: 'use-fp',
  message: 'Unallowed import of `lodash`. Use `lodash/fp` instead'
}];

ruleTester.run('use-fp', rule, {
  valid: [
    `import _ from 'lodash/fp';`,
    `import {bindAll} from 'lodash/fp';`,
    `import _, {bindAll} from 'lodash/fp';`,
    `import _, {bindAll as b} from 'lodash/fp';`,
    `import _ from 'lodash/fp/bindAll';`,
    `import _ from 'lodash-fp';`,
    `import _ from 'lodash-webpack-plugin';`,
    `var _ = require('lodash/fp');`,
    `var _ = require('lodash/fp/bindAll');`,
    `import foo from 'foo';`,
    `var foo = require('foo');`,
    `var foo = require(fooName);`
  ],
  invalid: [
    {
      code: `import _ from 'lodash';`,
      errors
    },
    {
      code: `import _ from 'lodash/bindAll';`,
      errors
    },
    {
      code: `var _ = require('lodash');`,
      errors
    },
    {
      code: `var bindAll = require('lodash/bindAll');`,
      errors
    }
  ]
});
