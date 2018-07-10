'use strict';

const enhance = require('./core/enhance');

const create = function (context) {
  const info = enhance();

  return info.merge({
    CallExpression(node) {
      const callee = node.callee;
      const method = info.helpers.isMethodCall(callee);
      if (method && !method.skipFixed && (callee.arguments.length || 1) < method.ary) {
        context.report(node, `\`${method.name}\` should be called without an intermediate partial.`);
      }
    }
  });
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Avoid unnecessary intermediate partials in curried methods.',
      recommended: 'off'
    }
  }
};
