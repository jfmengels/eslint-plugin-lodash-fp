'use strict';

const _ = require('lodash/fp');
const astUtils = require('eslint-ast-utils');
const enhance = require('./core/enhance');

const isImportSpecifier = _.matches({type: 'ImportSpecifier'});
const isObjectPattern = _.matches({type: 'ObjectPattern'});

const errorMessage = 'Import of Lodash submodule should not be destructured';

function isLodashSubModule(source) {
  return _.startsWith('lodash/', source) && source !== 'lodash/fp';
}

function isRequireOfLodashSubModule(node) {
  return astUtils.isStaticRequire(node) &&
    node.arguments.length > 0 &&
    isLodashSubModule(node.arguments[0].value);
}

const create = function (context) {
  const info = enhance();

  return info.merge({
    ImportDeclaration: function (node) {
      if (isLodashSubModule(node.source.value)) {
        const importSpecifier = _.find(isImportSpecifier, node.specifiers);
        if (importSpecifier) {
          context.report(importSpecifier, errorMessage);
        }
      }
    },
    VariableDeclarator: function (node) {
      if (node.init && isObjectPattern(node.id) && isRequireOfLodashSubModule(node.init)) {
        context.report(node.init, errorMessage);
      }
    }
  });
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Forbid destructuring of Lodash submodules.',
      recommended: 'error'
    }
  }
};
