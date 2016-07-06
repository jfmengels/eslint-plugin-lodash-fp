'use strict';

const enhance = require('./core/enhance');

const create = function (context) {
  const info = enhance();

  return info.merge({
    CallExpression: function (node) {
      const method = info.helpers.isMethodCallOf(['partial', 'partialRight'], node);
      if (!method || node.arguments.length === 0) {
        return;
      }

      const func = info.helpers.isMethod(node.arguments[0]) || info.helpers.isMethodCall(node.arguments[0]);
      if (func && !func.skipFixed) {
        context.report(node, 'Foo');
      }
    }
  });
};

module.exports = {
  create,
  meta: {
    docs: {}
  }
};
