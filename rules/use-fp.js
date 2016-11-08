'use strict';

const astUtils = require('eslint-ast-utils');
const enhance = require('./core/enhance');

const lodashRegex = /^lodash($|\/(?!fp))/;

function reportIfLodashButNotFp(context, node, name) {
  if (lodashRegex.test(name)) {
    context.report(node, 'Unallowed import of `lodash`. Use `lodash/fp` instead');
  }
}

const create = function (context) {
  const info = enhance();

  return info.merge({
    ImportDeclaration: function (node) {
      reportIfLodashButNotFp(context, node, node.source.value);
    },
    CallExpression: function (node) {
      if (astUtils.isStaticRequire(node)) {
        reportIfLodashButNotFp(context, node, node.arguments[0].value);
      }
    }
  });
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Use lodash/fp instead of Lodash.',
      recommended: 'error'
    }
  }
};
