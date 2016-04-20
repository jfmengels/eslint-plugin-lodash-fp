'use strict';

module.exports = {
  rules: {
    'consistent-compose': require('./rules/consistent-compose'),
    'consistent-name': require('./rules/consistent-name'),
    'no-chain': require('./rules/no-chain'),
    'no-extraneous-function-wrapping': require('./rules/no-extraneous-function-wrapping'),
    'no-single-composition': require('./rules/no-single-composition'),
    'prefer-get': require('./rules/prefer-get'),
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
        'lodash-fp/consistent-compose': 'off',
        'lodash-fp/consistent-name': ['error', '_'],
        'lodash-fp/no-chain': 'error',
        'lodash-fp/no-extraneous-function-wrapping': 'error',
        'lodash-fp/no-single-composition': 'error',
        'lodash-fp/prefer-get': 'error',
        'lodash-fp/use-fp': 'error'
      }
    }
  }
};
