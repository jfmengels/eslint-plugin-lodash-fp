'use strict';

var _ = require('lodash/fp');
var data = require('./core/lodash-data');
var enhance = require('./core/enhance');

function checkOverrides(overrides) {
  overrides.map(function (override) {
    return {
      override: override,
      target: data.aliasToReal[override] || override
    };
  }).reduce(function (res, item) {
    if (res[item.target]) {
      throw new Error('`override` contains `' + res[item.target] + '` and `' + item.override + '` that target `' + item.target + '`');
    }
    res[item.target] = item.override;
    return res;
  }, {});
}

function wantedAlias(overrides, method) {
  return _.intersection(data.realToAlias[method.realName], overrides)[0] || method.realName;
}

module.exports = function (context) {
  var options = context.options[0] || {};
  var overrides = options.overrides || [];
  checkOverrides(overrides);
  var info = enhance();

  return info.merge({
    CallExpression: function (node) {
      var method = info.helpers.isMethodCall(node);
      if (!method) {
        return;
      }
      var alias = wantedAlias(overrides, method);
      if (alias !== method.name) {
        context.report(node, 'Use `' + alias + '` instead of `' + method.name + '`.');
      }
    }
  });
};

module.exports.schema = [
  {
    type: 'object',
    properties: {
      overrides: {
        type: 'array',
        uniqueItems: true,
        items: {
          type: 'string'
        }
      }
    }
  }
];
