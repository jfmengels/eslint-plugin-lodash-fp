'use strict';

const astUtil = require('./core/ast-util');

function shouldCheckDeeper(node, nodeRight, toCompare) {
  return node.operator === '&&' &&
    nodeRight &&
    nodeRight.type === 'MemberExpression' &&
    !astUtil.isComputed(nodeRight) &&
    (!toCompare || astUtil.isEquivalentExp(nodeRight, toCompare));
}

const create = function (context) {
  const DEFAULT_LENGTH = 3;
  const ruleDepth = parseInt(context.options[0], 10) || DEFAULT_LENGTH;

  const expStates = [];
  function getState() {
    return expStates[expStates.length - 1] || {depth: 0};
  }

  /* eslint quote-props: [2, "as-needed"] */
  return {
    LogicalExpression: function (node) {
      const state = getState();
      const rightMemberExp = astUtil.isEqEqEq(node.right) && state.depth === 0 ? node.right.left : node.right;

      if (shouldCheckDeeper(node, rightMemberExp, state.node)) {
        expStates.push({depth: state.depth + 1, node: rightMemberExp.object});
        if (astUtil.isEquivalentExp(node.left, rightMemberExp.object) && state.depth >= ruleDepth - 2) {
          context.report(node, 'Prefer `_.get` or `_.has` over an `&&` chain');
        }
      }
    },
    'LogicalExpression:exit': function (node) {
      const state = getState();
      if (state && state.node === node.right.object) {
        expStates.pop();
      }
    }
  };
};

const schema = [
  {
    type: 'integer',
    minimum: 2
  }
];

module.exports = {
  create,
  meta: {
    schema,
    docs: {
      description: 'Prefer [`_.get`](https://lodash.com/docs#get) over multiple `&&`.',
      recommended: 'error'
    }
  }
};
