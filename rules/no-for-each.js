'use strict';

var _ = require('lodash/fp');
var enhance = require('./core/enhance');

var isForEachCall = _.matches({type: 'MemberExpression', property: {name: 'forEach'}});

module.exports = function (context) {
  var info = enhance();
  var options = context.options[0] || {};
  var noNative = options.noNative !== false;

  return info.merge({
    CallExpression: function (node) {
      var method = info.helpers.isForEachMethod(node);
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
