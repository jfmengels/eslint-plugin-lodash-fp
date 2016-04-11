'use strict';

module.exports = {
  rules: {
    'no-chain': require('./rules/no-chain'),
    'use-fp': require('./rules/use-fp')
  },
  configs: {
    recommended: {
      env: {
        es6: true
      },
      parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module'
      },
      rules: {
        'lodash-fp/no-chain': 'error',
        'lodash-fp/use-fp': 'error'
      }
    }
  }
};
