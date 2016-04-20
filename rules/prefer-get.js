'use strict';

var astUtil = require('./core/astUtil');

function shouldCheckDeeper(node, nodeRight, toCompare) {
  return node.operator === '&&' &&
    nodeRight &&
    nodeRight.type === 'MemberExpression' &&
    !astUtil.isComputed(nodeRight) &&
    (!toCompare || astUtil.isEquivalentExp(nodeRight, toCompare));
}

module.exports = function (context) {
  var DEFAULT_LENGTH = 3;
  var ruleDepth = parseInt(context.options[0], 10) || DEFAULT_LENGTH;

  var expStates = [];
  function getState() {
    return expStates[expStates.length - 1] || {depth: 0};
  }

  /* eslint quote-props: [2, "as-needed"] */
  return {
    LogicalExpression: function (node) {
      var state = getState();
      var rightMemberExp = (astUtil.isEqEqEq(node.right) && state.depth === 0) ? node.right.left : node.right;

      if (shouldCheckDeeper(node, rightMemberExp, state.node)) {
        expStates.push({depth: state.depth + 1, node: rightMemberExp.object});
        if (astUtil.isEquivalentExp(node.left, rightMemberExp.object) && state.depth >= ruleDepth - 2) {
          context.report(node, "Prefer `_.get` or `_.has` over an `&&` chain");
        }
      }
    },
    'LogicalExpression:exit': function (node) {
      var state = getState();
      if (state && state.node === node.right.object) {
        expStates.pop();
      }
    }
  };
};

module.exports.schema = [
  {
    type: 'integer',
    minimum: 2
  }
];
