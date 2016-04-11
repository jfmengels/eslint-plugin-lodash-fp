import test from 'ava';
import {RuleTester} from 'eslint';
import rule from '../rules/use-fp';

const ruleTester = new RuleTester({
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

test(() => {
  ruleTester.run('use-fp', rule, {
    valid: [
      `import _ from 'lodash/fp';`,
      `import {bindAll} from 'lodash/fp';`,
      `import _, {bindAll} from 'lodash/fp';`,
      `import _ from 'lodash/fp/bindAll';`,
      `var _ = require('lodash/fp');`,
      `var _ = require('lodash/fp/bindAll');`,
      `import foo from 'foo';`,
      `var foo = require('foo');`
    ],
    invalid: [
      {
        code: `import _ from 'lodash';`,
        errors
      }, {
        code: `import _ from 'lodash/bindAll';`,
        errors
      }, {
        code: `var _ = require('lodash');`,
        errors
      }, {
        code: `var bindAll = require('lodash/bindAll');`,
        errors
      }
    ]
  });
});
