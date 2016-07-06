'use strict';

const _ = require('lodash/fp');
const enhance = require('./core/enhance');

const exceptions = ['uniqueId', 'now', 'noConflict', 'runInContext'];

module.exports = function (context) {
  const info = enhance();

  return info.merge({
    CallExpression: function (node) {
      if (node.arguments.length !== 0) {
        return;
      }
      const method = info.helpers.isMethodCall(node);
      if (method && !_.includes(method.name, exceptions)) {
        context.report(node, 'No call without arguments');
      }
    }
  });
};
