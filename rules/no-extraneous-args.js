'use strict';

var enhance = require('./core/enhance');

module.exports = function (context) {
  var info = enhance();

  return info.merge({
    CallExpression: function (node) {
      var method = info.helpers.isMethodCall(node);

      if (method && !method.skipFixed && node.arguments.length > method.ary) {
        context.report(node, '`' + method.name + '` is capped at ' + method.ary + ' arguments');
      }
    }
  });
};
