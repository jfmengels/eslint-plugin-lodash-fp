'use strict';

const reqAll = require('req-all');
const createIndex = require('create-eslint-index');

const rules = reqAll('rules', {camelize: false});

const recommendedRules = createIndex.createConfig({
  plugin: 'lodash-fp',
  field: 'meta.docs.recommended'
}, rules);

module.exports = {
  rules,
  configs: {
    recommended: {
      rules: recommendedRules
    }
  }
};
