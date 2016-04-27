'use strict';

var astUtil = require('./core/astUtil');

module.exports = function (context) {
  var options = context.options[0] || {};
  var shouldCheckArrowFunctions = options.arrowFunctions === true;

  function handleFunctionExpression(node) {
    if (astUtil.isIdentityFunction(node)) {
      context.report(node, 'Prefer `_.identity` over a function returning its argument');
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
