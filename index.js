'use strict';

module.exports = {
  rules: {
    'consistent-compose': require('./rules/consistent-compose'),
    'consistent-name': require('./rules/consistent-name'),
    'no-argumentless-calls': require('./rules/no-argumentless-calls'),
    'no-chain': require('./rules/no-chain'),
    'no-extraneous-function-wrapping': require('./rules/no-extraneous-function-wrapping'),
    'no-single-composition': require('./rules/no-single-composition'),
    'no-submodule-destructuring': require('./rules/no-submodule-destructuring'),
    'prefer-compact': require('./rules/prefer-compact'),
    'prefer-composition-grouping': require('./rules/prefer-composition-grouping'),
    'prefer-constant': require('./rules/prefer-constant'),
    'prefer-flat-map': require('./rules/prefer-flat-map'),
    'prefer-get': require('./rules/prefer-get'),
    'prefer-identity': require('./rules/prefer-identity'),
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
        'lodash-fp/no-submodule-destructuring': 'error',
        'lodash-fp/prefer-compact': 'error',
        'lodash-fp/prefer-composition-grouping': 'error',
        'lodash-fp/prefer-constant': ['error', {arrowFunctions: false}],
        'lodash-fp/prefer-flat-map': 'error',
        'lodash-fp/prefer-get': 'error',
        'lodash-fp/prefer-identify': ['error', {arrowFunctions: false}],
        'lodash-fp/use-fp': 'error'
      }
    }
  }
};
