'use strict';

const _ = require('lodash/fp');
const enhance = require('./core/enhance');

const create = function (context) {
  const info = enhance();

  return info.merge({
    CallExpression: function (node) {
      const method = info.helpers.isComposeMethod(node);
      if (!method || node.arguments.length > 1 || _.get([0, 'type'], node.arguments) === 'SpreadElement') {
        return;
      }

      // _.flow accepts array of Functions, check that we have more than one Function
      const isArrayExpression = _.get([0, 'type'], node.arguments) === 'ArrayExpression';
      if (isArrayExpression && _.get([0, 'elements', 'length'], node.arguments) > 1) {
        return;
      }

      context.report({
        node,
        message: `\`${method.name}\` should have at least two ${isArrayExpression ? 'functions' : 'arguments'}`
      });
    }
  });
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Enforce at least two methods arguments for composition methods.',
      recommended: 'error'
    }
  }
};
