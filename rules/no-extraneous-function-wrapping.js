'use strict';

var _ = require('lodash/fp');
var enhance = require('./core/enhance');
var containsIdentifier = require('./core/containsIdentifier');

var notCurried = ['castArray', 'flow', 'pipe', 'flowRight', 'compose', 'iteratee', 'mixin', 'runInContext'];
var isNotCurried = _.includes(_, notCurried);

var isFunction = _.flow(
  _.get('type'),
  _.includes(_, ['FunctionExpression', 'FunctionDeclaration', 'ArrowFunctionExpression'])
);

function isExtraneous(info, argNode) {
  var canBeExtraneous = isFunction(argNode) && argNode.params.length === 1;
  if (!canBeExtraneous) {
    return false;
  }
  var lastArgName = argNode.params[0].name;
  var callExpression;
  if (argNode.body.type === 'BlockStatement') {
    var body = argNode.body.body;
    if (body.length !== 1 || body[0].type !== 'ReturnStatement') {
      return false;
    }
    callExpression = body[0].argument;
  } else {
    callExpression = argNode.body;
  }

  // If <SOMETHING> is not a call expression
  if (callExpression.type !== 'CallExpression' ||
    // or if `lastArgName` is used somewhere else in the function
    containsIdentifier(lastArgName, callExpression.callee)
  ) {
    return false;
  }

  var methodName = info.helpers.isLodashCall(callExpression);
  if (!methodName && callExpression.callee.type !== 'CallExpression') {
    return false;
  }

  if (isNotCurried(methodName)) {
    // If it's a lodash method that is not curried
    return false;
  }
  var calleeArgs = callExpression.arguments;
  var lastCalleeArg = calleeArgs[calleeArgs.length - 1];
  return lastCalleeArg.type === 'Identifier' &&
    lastCalleeArg.name === lastArgName;
}

var errorMessage = 'Found extraneous function wrap around curried method. Pass inner function directly';

module.exports = function (context) {
  var info = enhance();

  return info.merge({
    FunctionDeclaration: function (node) {
      if (isExtraneous(info, node)) {
        context.report(node, errorMessage);
      }
    },
    CallExpression: function (node) {
      node.arguments
        .filter(function (argNode) {
          return isExtraneous(info, argNode);
        })
        .forEach(function (arg) {
          context.report(arg, errorMessage);
        });
    }
  });
};
