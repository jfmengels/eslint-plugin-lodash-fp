'use strict';

var enhance = require('./core/enhance');

function isLodashWrap(helpers, node) {
  return node.type === 'Identifier' &&
    helpers.isAnyLodash(node.name);
}

module.exports = function (context) {
  var info = enhance();
  var helpers = info.helpers;

  return info.merge({
    CallExpression: function (node) {
      var callee = node.callee;
      if (isLodashWrap(helpers, callee) || info.helpers.isAnyMethodOf('chain', callee)) {
        context.report(node, 'Unallowed use of chain operations. Use flow/compose instead');
      }
    }
  });
};
