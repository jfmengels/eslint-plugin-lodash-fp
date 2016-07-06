'use strict';

const enhance = require('./core/enhance');
const constants = require('./core/constants');

module.exports = function (context) {
  const info = enhance();
  const composeMethod = context.options[0];
  if (!composeMethod) {
    return {};
  }

  return info.merge({
    CallExpression: function (node) {
      const method = info.helpers.isComposeMethod(node);
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
