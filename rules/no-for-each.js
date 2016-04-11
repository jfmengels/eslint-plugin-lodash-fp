'use strict';

var _ = require('lodash/fp');
var enhance = require('./core/enhance');

var isForEachCall = _.matches({type: 'MemberExpression', property: {name: 'forEach'}});

var forbiddenMethods = [
  'forEach', 'forEachRight', 'each', 'eachRight'
];

module.exports = function (context) {
  var info = enhance();
  var options = context.options[0] || {};
  var noNative = options.noNative !== false;

  return info.merge({
    CallExpression: function (node) {
      var name = info.helpers.isMethodCallOf(forbiddenMethods, node);
      if (name) {
        context.report(node, 'Forbidden use of `_.forEach`');
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
