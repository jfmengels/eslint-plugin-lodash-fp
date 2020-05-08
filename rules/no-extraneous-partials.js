'use strict';

const _ = require('lodash/fp');
const enhance = require('./core/enhance');

const hasSpread = _.flow(_.get('arguments'), _.some({ type: 'SpreadElement' }));

const create = function (context) {
  const info = enhance();

  return info.merge({
    CallExpression(node) {
      const { callee } = node;
      const method = info.helpers.isMethodCall(callee);
      if (method && !method.skipFixed && (callee.arguments.length || 1) < method.ary && !hasSpread(callee)) {
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
      recommended: 'off',

      // no-extraneous-partials.js
      url: 'https://github.com/jfmengels/eslint-plugin-lodash-fp/blob/master/docs/rules/no-extraneous-partials.md'
    }
  }
};
