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
      var name = match(node);
      if (name) {
        context.report(node, '`' + name + '` should have at least two arguments');
      }
    }
  });
};
