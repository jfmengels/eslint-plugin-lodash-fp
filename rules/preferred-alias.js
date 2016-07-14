'use strict';

const _ = require('lodash/fp');
const data = require('./core/lodash-data');
const enhance = require('./core/enhance');

function checkOverrides(overrides) {
  overrides.map(function (override) {
    return {
      override: override,
      target: data.aliasToReal[override] || override
    };
  }).reduce(function (res, item) {
    if (res[item.target]) {
      throw new Error(`\`override\` contains \`${res[item.target]}\` and \`${item.override}\` that target \`${item.target}\``);
    }
    res[item.target] = item.override;
    return res;
  }, {});
}

function wantedAlias(overrides, method) {
  return _.intersection(data.realToAlias[method.realName], overrides)[0] || method.realName;
}

const create = function (context) {
  const options = context.options[0] || {};
  const overrides = options.overrides || [];
  checkOverrides(overrides);
  const info = enhance();

  return info.merge({
    CallExpression: function (node) {
      const method = info.helpers.isMethodCall(node);
      if (!method) {
        return;
      }
      const alias = wantedAlias(overrides, method);
      if (alias !== method.name) {
        context.report(node, `Use \`${alias}\` instead of \`${method.name}\`.`);
      }
    }
  });
};

const schema = [
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

module.exports = {
  create,
  meta: {
    schema,
    docs: {
      description: 'Limit the use of aliases.',
      recommended: 'off'
    }
  }
};
