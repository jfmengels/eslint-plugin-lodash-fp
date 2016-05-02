'use strict';

var _ = require('lodash/fp');
var enhance = require('./core/enhance');

var groupableMethods = ['map', 'filter', 'reject'];

function hasConsecutiveOperations(methodNames) {
  var index = _.findIndex(_.includes(_, groupableMethods), methodNames);
  if (index === -1) {
    return false;
  }
  if (methodNames[index] === methodNames[index + 1]) {
    return true;
  }
  return hasConsecutiveOperations(methodNames.slice(index + 1));
}

module.exports = function (context) {
  var info = enhance();

  return info.merge({
    CallExpression: function (node) {
      var method = info.helpers.isComposeMethod(node);
      if (!method) {
        return method;
      }

      var methods = info.helpers.getComposeMethodArgMethods(method.name, node);
      if (methods && hasConsecutiveOperations(_.map('name', methods))) {
        context.report(node, 'Prefer `_.flatMap` over consecutive `_.map` and `_.flatten`');
      }
    }
  });
};
