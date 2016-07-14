'use strict';

const _ = require('lodash/fp');
const enhance = require('./core/enhance');

const isForEachCall = _.matches({type: 'MemberExpression', property: {name: 'forEach'}});

const create = function (context) {
  const info = enhance();
  const options = context.options[0] || {};
  const noNative = options.noNative !== false;

  return info.merge({
    CallExpression: function (node) {
      const method = info.helpers.isForEachMethod(node);
      if (method) {
        context.report(node, `Forbidden use of \`_.${method.realName}\``);
        return;
      }

      if (noNative && isForEachCall(node.callee)) {
        context.report(node, 'Forbidden use of native `forEach`');
      }
    }
  });
};

const schema = [
  {
    type: 'object',
    properties: {
      noNative: {
        type: 'boolean'
      }
    }
  }
];

module.exports = {
  create,
  meta: {
    schema,
    docs: {
      description: ' Forbid the use of [`_.forEach`](https://lodash.com/docs#forEach)',
      recommended: 'off'
    }
  }
};
