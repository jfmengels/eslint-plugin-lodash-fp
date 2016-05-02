'use strict';

var enhance = require('./core/enhance');

var composeMethods = ['compose', 'flow', 'flowRight', 'pipe'];

module.exports = function (context) {
  var info = enhance();

  var match = info.helpers.isMethodCallOf(composeMethods);

  return info.merge({
    CallExpression: function (node) {
      if (node.arguments.length > 1) {
        return;
      }
      var method = match(node);
      if (method) {
        context.report(node, '`' + method.name + '` should have at least two arguments');
      }
    }
  });
};
