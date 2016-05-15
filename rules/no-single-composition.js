'use strict';

var enhance = require('./core/enhance');

module.exports = function (context) {
  var info = enhance();

  return info.merge({
    CallExpression: function (node) {
      if (node.arguments.length > 1) {
        return;
      }
      var method = info.helpers.isComposeMethod(node);
      if (method) {
        context.report(node, '`' + method.name + '` should have at least two arguments');
      }
    }
  });
};
