'use strict';

const _ = require('lodash/fp');
const reqAll = require('req-all');

const rules = reqAll('rules', {camelize: false});

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
      rules: _.flow(
        _.mapValues('meta.docs.recommended'),
        _.mapKeys(key => 'lodash-fp/' + key)
      )(rules)
    }
  }
};
