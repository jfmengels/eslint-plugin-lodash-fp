'use strict';

var enhance = require('./core/enhance');

function isLodashWrap(info, node) {
  return node.type === 'Identifier' &&
    info.is(node.name, 'lodash', true);
}

function isMemberChain(info, node) {
  return node.type === 'MemberExpression' &&
    node.property.name === 'chain' &&
    info.is(node.object.name, 'lodash', true);
}

function isChain(info, node) {
  return node.type === 'Identifier' &&
    info.is(node.name, 'chain', true);
}

module.exports = function (context) {
  var info = enhance();

  return info.merge({
    CallExpression: function (node) {
      var callee = node.callee;
      if (isLodashWrap(info, callee) || isMemberChain(info, callee) || isChain(info, callee)) {
        context.report(node, 'Unallowed use of chain operations. Use flow/compose instead');
      }
    }
  });
};
