'use strict';

const enhance = require('./core/enhance');

const create = function (context) {
  const info = enhance();

  return info.merge({
    CallExpression(node) {
      const method = info.helpers.isMethodCall(node.callee);
      if (method && !method.skipFixed && method.ary) {
        context.report(node, `\`${method.name}\` should be called without an intermediate partial.`);
      }
    }
  });
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'No extraneous partials in method calls.',
      recommended: 'off'
    }
  }
};
