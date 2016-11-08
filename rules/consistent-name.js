'use strict';

const _ = require('lodash/fp');
const astUtils = require('eslint-ast-utils');
const enhance = require('./core/enhance');

function isLodash(name) {
  return name === 'lodash' || name === 'lodash/fp';
}

function hasDefaultSpecifier(node) {
  return node.specifiers.some(function (specifier) {
    return specifier.type === 'ImportDefaultSpecifier';
  });
}

/* eslint quote-props: [2, "as-needed"] */
const create = function (context) {
  const info = enhance();
  const expectedName = context.options[0] || '_';
  let importNode = null;

  return info.merge({
    ImportDeclaration: function (node) {
      if (isLodash(node.source.value) && hasDefaultSpecifier(node)) {
        importNode = node;
      }
    },
    VariableDeclarator: function (node) {
      if (node.init && astUtils.isStaticRequire(node.init)) {
        if (isLodash(node.init.arguments[0].value)) {
          importNode = node;
        }
      }
    },
    'Program:exit': function () {
      const importValues = _.values(info.imports);
      if (// `lodash`/`lodash/fp` was imported
        (importValues.indexOf('') !== -1 || importValues.indexOf('fp') !== -1) &&
        // but <expectedName> does not refer to either `lodash` or `lodash/fp`
        !info.helpers.isAnyLodash(expectedName)
      ) {
        context.report(importNode, `Lodash should be imported as \`${expectedName}\``);
      }
    }
  });
};

const schema = [{
  type: 'string'
}];

module.exports = {
  create,
  meta: {
    schema,
    docs: {
      description: 'Enforce a consistent name for Lodash.',
      recommended: ['error', '_']
    }
  }
};
