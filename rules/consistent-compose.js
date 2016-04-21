'use strict';

var enhance = require('./core/enhance');

module.exports = function (context) {
  var info = enhance();
  var composeMethod = context.options[0];
  if (!composeMethod) {
    return {};
  }

  return info.merge({
    CallExpression: function (node) {
      var name = info.helpers.isLodashCall(node);
      if (name !== false && name !== composeMethod) {
        context.report(node, 'Forbidden use of `' + name + '`. Use `' + composeMethod + '` instead');
      }
    }
  });
};

module.exports.schema = [{
  type: 'string',
  enum: ['flow', 'flowRight', 'compose', 'pipe']
}];
