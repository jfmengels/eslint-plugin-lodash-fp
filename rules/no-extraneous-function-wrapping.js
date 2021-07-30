'use strict';

const _ = require('lodash/fp');
const astUtils = require('eslint-ast-utils');
const enhance = require('./core/enhance');
const getDocsUrl = require('./core/get-docs-url');

const isFunction = _.flow(
  _.get('type'),
  _.includes(_, ['FunctionExpression', 'FunctionDeclaration', 'ArrowFunctionExpression'])
);

function hasSingleIdentifierParam(node) {
  return node.params.length === 1 &&
    node.params[0].type === 'Identifier';
}

function isExtraneous(info, argNode) {
  const canBeExtraneous = isFunction(argNode) && hasSingleIdentifierParam(argNode);
  if (!canBeExtraneous) {
    return false;
  }
  const lastArgName = argNode.params[0].name;
  let callExpression;
  if (argNode.body.type === 'BlockStatement') {
    const {body} = argNode.body;
    if (body.length !== 1 || body[0].type !== 'ReturnStatement' || body[0].argument === null) {
      return false;
    }
    callExpression = body[0].argument;
  } else {
    callExpression = argNode.body;
  }

  // If <SOMETHING> is not a call expression
  if (callExpression.type !== 'CallExpression' ||
    // Or if `lastArgName` is used somewhere else in the function
    astUtils.containsIdentifier(lastArgName, callExpression.callee) ||
    // Or in `lastArgName` is used among the other arguments
    astUtils.someContainIdentifier(lastArgName, _.initial(callExpression.arguments))
  ) {
    return false;
  }

  const method = info.helpers.isMethodCall(callExpression);
  if (!method && callExpression.callee.type !== 'CallExpression') {
    return false;
  }

  if (method.skipFixed) {
    // If it's a lodash method that is not curried
    return false;
  }
  const calleeArgs = callExpression.arguments;
  const lastCalleeArg = calleeArgs[calleeArgs.length - 1];
  return lastCalleeArg &&
    lastCalleeArg.type === 'Identifier' &&
    lastCalleeArg.name === lastArgName;
}

const errorMessage = 'Found extraneous function wrap around curried method. Pass inner function directly';

const create = function (context) {
  const info = enhance();

  return info.merge({
    FunctionDeclaration(node) {
      if (isExtraneous(info, node)) {
        context.report(node, errorMessage);
      }
    },
    CallExpression(node) {
      node.arguments
        .filter(argNode => {
          return isExtraneous(info, argNode);
        })
        .forEach(arg => {
          context.report(arg, errorMessage);
        });
    }
  });
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Avoid unnecessary function wrapping.',
      recommended: 'error',
      url: getDocsUrl(__filename)
    }
  }
};
