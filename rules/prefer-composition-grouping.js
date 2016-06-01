'use strict';

var _ = require('lodash/fp');
var enhance = require('./core/enhance');

var realName = _.property('realName');
var groupableMethods = ['map', 'filter', 'reject'];

function consecutiveOperations(methods) {
  var names = _.map(realName, methods);
  var index = _.findIndex(_.includes(_, groupableMethods), names);
  if (index === -1) {
    return [];
  }
  var operations = [];
  if (realName(methods[index]) === realName(methods[index + 1])) {
    operations = [methods[index + 1]];
  }
  return operations.concat(consecutiveOperations(methods.slice(index + 1)));
}

module.exports = function (context) {
  var info = enhance();

  return info.merge({
    CallExpression: function (node) {
      var method = info.helpers.isComposeMethod(node);
      if (!method) {
        return;
      }
      var methods = info.helpers.getComposeMethodArgMethods(method.name, node);
      consecutiveOperations(methods).forEach(function (operation) {
        context.report(node, 'Prefer regrouping successive calls of `' + operation.name + '` into one function or function call');
      });
    }
  });
};
