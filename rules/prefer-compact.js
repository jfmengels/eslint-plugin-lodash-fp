'use strict';

var enhance = require('./core/enhance');
var astUtil = require('./core/astUtil');

module.exports = function (context) {
  var info = enhance();

  var isFilterCall = info.helpers.isMethodCallOf('filter');

  function isIdentity(node) {
    return info.helpers.isMethodOf('identity', node) ||
      astUtil.isIdentityFunction(node);
  }

  function isFilterWithIdentity(node) {
    return isFilterCall(node) && isIdentity(node.arguments[0]);
  }

  return info.merge({
    CallExpression: function (node) {
      if (isFilterWithIdentity(node)) {
        context.report(node, 'Prefer `_.compact` over `_.filter` with identity function');
      }
    }
  });
};
