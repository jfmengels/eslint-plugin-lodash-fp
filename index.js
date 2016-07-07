'use strict';

const reqAll = require('req-all');

const rules = reqAll('rules', {camelize: false});

const recommendedRules = Object.keys(rules)
  .map(key => [[`lodash-fp/${key}`], rules[key].meta.docs.recommended])
  .reduce((res, item) => {
    res[item[0]] = item[1];
    return res;
  }, {});

module.exports = {
  rules,
  configs: {
    recommended: {
      env: {
        es6: true
      },
      parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module'
      },
      rules: recommendedRules
    }
  }
};
