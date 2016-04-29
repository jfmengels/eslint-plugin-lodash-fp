'use strict';

var _ = require('lodash');
var mapping = require('lodash/fp/_mapping');
var enhance = require('./core/enhance');

function invert(aryMethod) {
  return _.keys(aryMethod)
    .reduce(function (res, ary) {
      aryMethod[ary].forEach(function (name) {
        res[name] = ary;
      });
      return res;
    }, {});
}

module.exports = function (context) {
  var info = enhance();
  var aryMethod = invert(mapping.aryMethod);

  return info.merge({
    CallExpression: function (node) {
      var name = info.helpers.isMethodCall(node);
      if (!name || mapping.skipFixed[name]) {
        return;
      }

      var methodAry = aryMethod[name];
      if (node.arguments.length > methodAry) {
        context.report(node, '`' + name + '` is capped at ' + methodAry + ' arguments');
      }
    }
  });
};
