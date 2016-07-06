'use strict';

const enhance = require('./core/enhance');

function isLodashWrap(helpers, node) {
  return node.type === 'Identifier' &&
    helpers.isAnyLodash(node.name);
}

module.exports = function (context) {
  const info = enhance();
  const helpers = info.helpers;

  return info.merge({
    CallExpression: function (node) {
      const callee = node.callee;
      if (isLodashWrap(helpers, callee) || info.helpers.isAnyMethodOf('chain', callee)) {
        context.report(node, 'Unallowed use of chain operations. Use flow/compose instead');
      }
    }
  });
};
