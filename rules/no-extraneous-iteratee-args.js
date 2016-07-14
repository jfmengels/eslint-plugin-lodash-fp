'use strict';

const enhance = require('./core/enhance');
const astUtil = require('./core/ast-util');

function getFunctionArgumentsLength(node) {
  if (!node || !astUtil.isFunction(node)) {
    return false;
  }

  return node.params.length;
}

const create = function (context) {
  const info = enhance();

  return info.merge({
    CallExpression: function (node) {
      const method = info.helpers.isMethodCall(node);
      if (!method) {
        return;
      }

      const nArgs = getFunctionArgumentsLength(node.arguments[method.iterateePos]);
      if (nArgs > method.iterateeAry) {
        context.report(node,
          `Too many parameters in \`${method.name}\`'s iteratee, it is only given ` +
          `${method.iterateeAry} argument${method.iterateeAry === 1 ? '' : 's'}.`);
      }
    }
  });
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'No extraneous parameters in iteratees.',
      recommended: 'error'
    }
  }
};
