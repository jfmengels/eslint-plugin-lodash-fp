'use strict';

const _ = require('lodash/fp');
const enhance = require('./core/enhance');

const realName = _.property('realName');
const groupableMethods = ['map', 'filter', 'reject'];

function consecutiveOperations(methods) {
  const names = _.map(realName, methods);
  const index = _.findIndex(_.includes(_, groupableMethods), names);
  if (index === -1) {
    return [];
  }
  let operations = [];
  if (realName(methods[index]) === realName(methods[index + 1])) {
    operations = [methods[index + 1]];
  }
  return operations.concat(consecutiveOperations(methods.slice(index + 1)));
}

function errorMessage(operation) {
  const baseMessage = `Prefer regrouping successive calls of \`${operation.name}\` into one function or function call`;
  const name = realName(operation);
  if (name === 'map') {
    return baseMessage;
  }
  const suggestedMethod = name === 'filter' ? 'overEvery' : 'overSome';
  return `${baseMessage}. You might want to use \`${suggestedMethod}\``;
}

const create = function (context) {
  const info = enhance();

  return info.merge({
    CallExpression: function (node) {
      const method = info.helpers.isComposeMethod(node);
      if (!method) {
        return;
      }
      const methods = info.helpers.getComposeMethodArgMethods(method.name, node);
      consecutiveOperations(methods).forEach(function (operation) {
        context.report(node, errorMessage(operation));
      });
    }
  });
};

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Prefer grouping similar methods in composition methods.',
      recommended: 'error'
    }
  }
};
