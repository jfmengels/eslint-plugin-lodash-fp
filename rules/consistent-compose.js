'use strict';

var _ = require('lodash/fp');
var enhance = require('./core/enhance');

var knownComposeMethods = ['flow', 'flowRight', 'compose', 'pipe'];
var isKnownComposeMethod = _.includes(_, knownComposeMethods);

module.exports = function (context) {
  var info = enhance();
  var composeMethod = context.options[0];
  if (!composeMethod) {
    return {};
  }

  return info.merge({
    CallExpression: function (node) {
      var name = info.helpers.isMethodCall(node);
      if (isKnownComposeMethod(name) && name !== composeMethod) {
        context.report(node, 'Forbidden use of `' + name + '`. Use `' + composeMethod + '` instead');
      }
    }
  });
};

module.exports.schema = [{
  type: 'string',
  enum: knownComposeMethods
}];
