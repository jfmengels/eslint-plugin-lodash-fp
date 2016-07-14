'use strict';

const astUtil = require('./core/ast-util');

const create = function (context) {
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
      description: 'Prefer [`_.identity`](https://lodash.com/docs#identity) over functions returning their argument.',
      recommended: ['error', {arrowFunctions: false}]
    }
  }
};
