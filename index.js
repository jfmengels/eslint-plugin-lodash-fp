'use strict';

module.exports = {
  rules: {
    'consistent-compose': require('./rules/consistent-compose'),
    'consistent-name': require('./rules/consistent-name'),
    'no-argumentless-calls': require('./rules/no-argumentless-calls'),
    'no-chain': require('./rules/no-chain'),
    'no-extraneous-function-wrapping': require('./rules/no-extraneous-function-wrapping'),
    'no-single-composition': require('./rules/no-single-composition'),
    'prefer-constant': require('./rules/prefer-constant'),
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
        'lodash-fp/no-argumentless-calls': 'error',
        'lodash-fp/no-chain': 'error',
        'lodash-fp/no-extraneous-function-wrapping': 'error',
        'lodash-fp/no-single-composition': 'error',
        'lodash-fp/prefer-constant': ['error', false],
        'lodash-fp/prefer-get': 'error',
        'lodash-fp/use-fp': 'error'
      }
    }
  }
};
