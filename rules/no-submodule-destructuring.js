'use strict';

var _ = require('lodash/fp');
var enhance = require('./core/enhance');
var isStaticRequire = require('./core/static-require');

var isImportSpecifier = _.matches({type: 'ImportSpecifier'});
var isObjectPattern = _.matches({type: 'ObjectPattern'});

var errorMessage = 'Import of Lodash submodule should not be destructured';

function isLodashSubModule(source) {
  return _.startsWith('lodash/', source) && source !== 'lodash/fp';
}

function isRequireOfLodashSubModule(node) {
  return isStaticRequire(node) &&
    node.arguments.length > 0 &&
    isLodashSubModule(node.arguments[0].value);
}

module.exports = function (context) {
  var info = enhance();

  return info.merge({
    ImportDeclaration: function (node) {
      if (isLodashSubModule(node.source.value)) {
        var importSpecifier = _.find(isImportSpecifier, node.specifiers);
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
