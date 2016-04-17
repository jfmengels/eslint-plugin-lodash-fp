'use strict';

var enhance = require('./core/enhance');
var containsIdentifier = require('./core/containsIdentifier');

var notCurried = ['castArray', 'flow', 'pipe', 'flowRight', 'compose', 'iteratee', 'mixin', 'runInContext'];
function isNotCurried(name) {
  return notCurried.indexOf(name) !== -1;
}

var functionTypes = ['FunctionExpression', 'FunctionDeclaration', 'ArrowFunctionExpression'];
function isFunction(node) {
  return functionTypes.indexOf(node.type) !== -1 &&
    node.params.length === 1;
}

function getLodashMethodName(info, node) {
  if (node.type === 'MemberExpression' && info.is(node.object.name, 'lodash')) {
    return node.property.name;
  } else if (node.type === 'Identifier' && info.imports[node.name]) {
    return info.imports[node.name].replace('fp/', '');
  }
  return null;
}

function isExtraneous(info, argNode) {
  if (!isFunction(argNode)) {
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

  var methodName = getLodashMethodName(info, callExpression.callee);
  if (callExpression.callee.type !== 'CallExpression' && !methodName) {
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

module.exports = function (context) {
  var info = enhance();

  return info.merge({
    FunctionDeclaration: function (node) {
      if (isExtraneous(info, node)) {
        context.report(node, 'Found extraneous function wrap around curried method. Pass inner function directly');
      }
    },
    CallExpression: function (node) {
      node.arguments
        .filter(function (argNode) {
          return isExtraneous(info, argNode);
        })
        .forEach(function (arg) {
          context.report(arg, 'Found extraneous function wrap around curried method. Pass inner function directly');
        });
    }
  });
};
