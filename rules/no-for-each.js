'use strict';

const _ = require('lodash/fp');
const enhance = require('./core/enhance');

const isForEachCall = _.matches({type: 'MemberExpression', property: {name: 'forEach'}});

module.exports = function (context) {
  const info = enhance();
  const options = context.options[0] || {};
  const noNative = options.noNative !== false;

  return info.merge({
    CallExpression: function (node) {
      const method = info.helpers.isForEachMethod(node);
      if (method) {
        context.report(node, 'Forbidden use of `_.' + method.realName + '`');
        return;
      }

      if (noNative && isForEachCall(node.callee)) {
        context.report(node, 'Forbidden use of native `forEach`');
      }
    }
  });
};

module.exports.schema = [
  {
    type: 'object',
    properties: {
      noNative: {
        type: 'boolean'
      }
    }
  }
];
