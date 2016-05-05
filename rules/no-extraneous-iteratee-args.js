'use strict';

var enhance = require('./core/enhance');
var astUtil = require('./core/ast-util');

function getFunctionArgumentsLength(node) {
  if (!node || !astUtil.isFunction(node)) {
    return false;
  }

  return node.params.length;
}

module.exports = function (context) {
  var info = enhance();

  return info.merge({
    CallExpression: function (node) {
      var method = info.helpers.isMethodCall(node);
      if (!method) {
        return;
      }

      var nArgs = getFunctionArgumentsLength(node.arguments[method.iterateePos]);
      if (nArgs > method.iterateeAry) {
        context.report(node, 'Prefer `_.flatMap` over consecutive `_.map` and `_.flatten`');
      }
    }
  });
};
