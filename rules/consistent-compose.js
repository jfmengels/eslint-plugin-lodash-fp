'use strict';

var enhance = require('./core/enhance');
var constants = require('./core/constants');

module.exports = function (context) {
  var info = enhance();
  var composeMethod = context.options[0];
  if (!composeMethod) {
    return {};
  }

  return info.merge({
    CallExpression: function (node) {
      var method = info.helpers.isComposeMethod(node);
      if (method && method.name !== composeMethod) {
        context.report(node, 'Forbidden use of `' + method.name + '`. Use `' + composeMethod + '` instead');
      }
    }
  });
};

module.exports.schema = [{
  type: 'string',
  enum: constants.COMPOSITION_METHODS
}];
