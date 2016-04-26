'use strict';

module.exports = function (context) {
  var options = context.options[0] || {};
  var shouldCheckArrowFunctions = options.arrowFunctions === true;

  function isIdentityFunction(node) {
    if (node.params.length !== 1 || !node.body) {
      return false;
    }
    var returnedElement;
    if (node.body.type === 'BlockStatement') {
      var subBody = node.body.body;
      if (subBody.length !== 1 || subBody[0].type !== 'ReturnStatement') {
        return false;
      }
      returnedElement = subBody[0].argument;
    } else {
      returnedElement = node.body;
    }

    return returnedElement.type === 'Identifier' &&
      returnedElement.name === node.params[0].name;
  }

  function handleFunctionExpression(node) {
    if (isIdentityFunction(node)) {
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
