'use strict';

const _ = require('lodash/fp');
const enhance = require('./core/enhance');
const constants = require('./core/constants');

const isForEach = _.flow(
  _.get('realName'),
  _.includes(_, constants.SIDE_EFFECT_METHODS)
);

function isMethodCall(info, node) {
  const method = info.helpers.isMethodCall(node);
  if (method) {
    return method;
  }
  if (info.helpers.isCallExpression(node.callee)) {
    return isMethodCall(info, node.callee);
  }
  return false;
}

const create = function (context) {
  const info = enhance();

  return info.merge({
    ExpressionStatement: function (node) {
      const method = isMethodCall(info, node.expression);
      if (method && !isForEach(method)) {
        context.report(node, 'Unused expression');
      }
    }
  });
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Enforce that the result of a Lodash method call gets used.',
      recommended: 'error'
    }
  }
};
