'use strict';

const _ = require('lodash/fp');
const enhance = require('./core/enhance');

const exceptions = ['uniqueId', 'now', 'noConflict', 'runInContext'];

const create = function (context) {
  const info = enhance();

  return info.merge({
    CallExpression(node) {
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

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Forbid argument-less calls of Lodash methods.',
      recommended: 'error',

      url: 'https://github.com/jfmengels/eslint-plugin-lodash-fp/blob/master/docs/rules/no-argumentless-calls.md'
    }
  }
};
