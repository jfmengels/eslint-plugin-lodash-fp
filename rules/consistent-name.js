'use strict';

var values = require('lodash.values');
var enhance = require('./core/enhance');
var isStaticRequire = require('./core/staticRequire');

function isLodash(name) {
  return name === 'lodash' || name === 'lodash/fp';
}

function hasDefaultSpecifier(node) {
  return node.specifiers.some(function (specifier) {
    return specifier.type === 'ImportDefaultSpecifier';
  });
}

/* eslint quote-props: [2, "as-needed"] */
module.exports = function (context) {
  var info = enhance();
  var expectedName = context.options[0] || '_';
  var importNode = null;

  return info.merge({
    ImportDeclaration: function (node) {
      if (isLodash(node.source.value) && hasDefaultSpecifier(node)) {
        importNode = node;
      }
    },
    VariableDeclarator: function (node) {
      if (node.init && isStaticRequire(node.init)) {
        if (isLodash(node.init.arguments[0].value)) {
          importNode = node;
        }
      }
    },
    'Program:exit': function () {
      var importValues = values(info.imports);
      if (// `lodash`/`lodash/fp` was imported
          (importValues.indexOf('') !== -1 || importValues.indexOf('fp') !== -1) &&
          // but <expectedName> does not refer to either `lodash` or `lodash/fp`
          !info.is(expectedName, 'lodash', true)) {
        context.report(importNode, 'Lodash should be imported as `' + expectedName + '`');
      }
    }
  });
};

module.exports.schema = [{
  type: 'string'
}];
