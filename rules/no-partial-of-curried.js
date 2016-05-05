'use strict';

var enhance = require('./core/enhance');

module.exports = function (context) {
  var info = enhance();

  return info.merge({
    CallExpression: function (node) {
      var method = info.helpers.isMethodCallOf(['partial', 'partialRight'], node);
      if (!method || node.arguments.length === 0) {
        return;
      }

      var func = info.helpers.isMethod(node.arguments[0]) || info.helpers.isMethodCall(node.arguments[0]);
      if (func && !func.skipFixed) {
        context.report(node, 'Foo');
      }
    }
  });
};
