'use strict';

const enhance = require('./core/enhance');
const isStaticRequire = require('./core/static-require');

function reportIfLodashButNotFp(context, node, name) {
  if (name && name.indexOf('lodash') === 0 && name.indexOf('lodash/fp') === -1) {
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
      if (isStaticRequire(node)) {
        reportIfLodashButNotFp(context, node, node.arguments[0].value);
      }
    }
  });
};

module.exports = {
  create,
  meta: {
    docs: {
      recommended: 'error'
    }
  }
};
