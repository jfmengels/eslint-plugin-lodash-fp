'use strict';

var enhance = require('./core/enhance');

function isLodashWrap(helpers, node) {
  return node.type === 'Identifier' &&
    helpers.isAnyLodash(node.name);
}

function isMemberChain(helpers, node) {
  return node.type === 'MemberExpression' &&
    node.property.name === 'chain' &&
    helpers.isAnyLodash(node.object.name);
}

function isChain(helpers, node) {
  return node.type === 'Identifier' &&
    helpers.isAnyMethod('chain', node.name);
}

module.exports = function (context) {
  var info = enhance();
  var helpers = info.helpers;

  return info.merge({
    CallExpression: function (node) {
      var callee = node.callee;
      if (isLodashWrap(helpers, callee) || isMemberChain(helpers, callee) || isChain(helpers, callee)) {
        context.report(node, 'Unallowed use of chain operations. Use flow/compose instead');
      }
    }
  });
};
