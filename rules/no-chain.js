'use strict';

const enhance = require('./core/enhance');

function isLodashWrap(helpers, node) {
  return node.type === 'Identifier' &&
    helpers.isAnyLodash(node.name);
}

const create = function (context) {
  const info = enhance();
  const helpers = info.helpers;

  return info.merge({
    CallExpression: function (node) {
      const callee = node.callee;
      if (isLodashWrap(helpers, callee) || info.helpers.isAnyMethodOf('chain', callee)) {
        context.report(node, 'Unallowed use of chain operations. Use flow/compose instead');
      }
    }
  });
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Forbid the use of [`_.chain`](https://lodash.com/docs#chain)',
      recommended: 'error'
    }
  }
};
