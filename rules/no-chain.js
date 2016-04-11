'use strict';

function isLodashWrap(node) {
  return node.type === 'Identifier' && node.name === '_';
}

function isChain(node) {
  return node.type === 'MemberExpression' &&
    node.object.name === '_' &&
    node.property.name === 'chain';
}

module.exports = function (context) {
  return {
    CallExpression: function (node) {
      if (isLodashWrap(node.callee) || isChain(node.callee)) {
        context.report(node, 'Unallowed use of chain operations. Use flow/compose instead');
      }
    }
  };
};
