'use strict';

const astUtil = require('./core/ast-util');

module.exports = function (context) {
  const options = context.options[0] || {};
  const shouldCheckArrowFunctions = options.arrowFunctions === true;

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
