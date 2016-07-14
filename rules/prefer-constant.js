'use strict';

const astUtil = require('./core/ast-util');

const create = function (context) {
  const options = context.options[0] || {};
  const shouldCheckArrowFunctions = options.arrowFunctions === true;

  function isCompletelyLiteral(node) {
    switch (node.type) {
      case 'Literal':
        return true;
      case 'BinaryExpression':
        return isCompletelyLiteral(node.left) && isCompletelyLiteral(node.right);
      case 'UnaryExpression':
        return isCompletelyLiteral(node.argument);
      case 'ConditionalExpression':
        return isCompletelyLiteral(node.test) && isCompletelyLiteral(node.consequent) && isCompletelyLiteral(node.alternate);
      default:
        return false;
    }
  }

  function handleFunctionExpression(node) {
    const valueReturnedInFirstLine = astUtil.getValueReturnedInFirstLine(node);
    if (valueReturnedInFirstLine && isCompletelyLiteral(valueReturnedInFirstLine)) {
      context.report(node, 'Prefer `_.constant` over a function returning a literal');
    }
  }

  return {
    FunctionExpression: handleFunctionExpression,
    FunctionDeclaration: handleFunctionExpression,
    ArrowFunctionExpression: function (node) {
      if (shouldCheckArrowFunctions) {
        handleFunctionExpression(node);
      }
    }
  };
};

const schema = [
  {
    type: 'object',
    properties: {
      arrowFunctions: {
        type: 'boolean'
      }
    }
  }
];

module.exports = {
  create,
  meta: {
    schema,
    docs: {
      description: 'Prefer [`_.constant`](https://lodash.com/docs#constant) over functions returning literals.',
      recommended: ['error', {arrowFunctions: false}]
    }
  }
};
