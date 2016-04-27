'use strict';

var _ = require('lodash/fp');
var enhance = require('./core/enhance');

var exceptions = ['uniqueId', 'now', 'noConflict', 'runInContext'];

module.exports = function (context) {
  var info = enhance();

  return info.merge({
    CallExpression: function (node) {
      if (node.arguments.length !== 0) {
        return;
      }
      var methodName = info.helpers.isMethodCall(node);
      if (methodName !== false && !_.includes(methodName, exceptions)) {
        context.report(node, 'No call without arguments');
      }
    }
  });
};
