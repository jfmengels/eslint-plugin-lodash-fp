'use strict';

const enhance = require('./core/enhance');
const astUtil = require('./core/ast-util');

const create = function (context) {
  const info = enhance();

  const isFilterCall = info.helpers.isMethodCallOf('filter');

  function isIdentity(node) {
    return info.helpers.isMethodOf('identity', node) ||
      astUtil.isIdentityFunction(node);
  }

  function isFilterWithIdentity(node) {
    return isFilterCall(node) && isIdentity(node.arguments[0]);
  }

  return info.merge({
    CallExpression: function (node) {
      if (isFilterWithIdentity(node)) {
        context.report(node, 'Prefer `_.compact` over `_.filter` with identity function');
      }
    }
  });
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Prefer [`_.compact`](https://lodash.com/docs#compact) over [`_.filter`](https://lodash.com/docs#filter) with identity function.',
      recommended: 'error'
    }
  }
};
