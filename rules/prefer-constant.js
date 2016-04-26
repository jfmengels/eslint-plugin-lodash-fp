'use strict';

var astUtil = require('./core/astUtil');

module.exports = function (context) {
  var options = context.options[0] || {};
  var shouldCheckArrowFunctions = options.arrowFunctions === true;

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
    var valueReturnedInFirstLine = astUtil.getValueReturnedInFirstLine(node);
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

module.exports.schema = [
  {
    type: 'object',
    properties: {
      arrowFunctions: {
        type: 'boolean'
      }
    }
  }
];
