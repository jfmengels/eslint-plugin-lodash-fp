'use strict';

var _ = require('lodash/fp');
var enhance = require('./core/enhance');
var data = require('./core/lodash-data');

function reportMessage(method, alternative) {
  var baseMessage = '`' + method.name + '` is capped at ' + method.ary + ' arguments';
  if (alternative) {
    return baseMessage + '. Did you mean to use `' + alternative + '`?';
  }
  if (method.spread) {
    return baseMessage + ' and takes an array as its last argument.';
  }
  return baseMessage + '.';
}

function getAlternative(method, nArgs) {
  var alternative = _.findKey(_.eq(method.realName), data.remap);
  if (alternative && data.ary[alternative] <= nArgs) {
    return alternative;
  }
  return false;
}

module.exports = function (context) {
  var info = enhance();

  return info.merge({
    CallExpression: function (node) {
      var method = info.helpers.isMethodCall(node);

      if (method && !method.skipFixed && node.arguments.length > method.ary) {
        var alternative = getAlternative(method, node.arguments.length);
        context.report(node, reportMessage(method, alternative));
      }
    }
  });
};
