'use strict';

const _ = require('lodash/fp');
const enhance = require('./core/enhance');
const data = require('./core/lodash-data');

function reportMessage(method, alternative) {
  const baseMessage = `\`${method.name}\` is capped at ${method.ary} arguments`;
  if (alternative) {
    return `${baseMessage}. Did you mean to use \`${alternative}\`?`;
  }
  if (method.spread) {
    return `${baseMessage} and takes an array as its last argument.`;
  }
  return `${baseMessage}.`;
}

function getAlternative(method, nArgs) {
  const alternative = _.findKey(_.eq(method.realName), data.remap);
  if (alternative && data.ary[alternative] <= nArgs) {
    return alternative;
  }
  return false;
}

const create = function (context) {
  const info = enhance();

  return info.merge({
    CallExpression: function (node) {
      const method = info.helpers.isMethodCall(node);

      if (method && !method.skipFixed && node.arguments.length > method.ary) {
        const alternative = getAlternative(method, node.arguments.length);
        context.report(node, reportMessage(method, alternative));
      }
    }
  });
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'No extraneous arguments to methods with a fixed arity.',
      recommended: 'error'
    }
  }
};
