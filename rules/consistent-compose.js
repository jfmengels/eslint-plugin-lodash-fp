'use strict';

const enhance = require('./core/enhance');
const constants = require('./core/constants');
const getDocsUrl = require('./core/get-docs-url');

const create = function (context) {
  const info = enhance();
  const composeMethod = context.options[0];
  if (!composeMethod) {
    return {};
  }

  return info.merge({
    CallExpression(node) {
      const method = info.helpers.isComposeMethod(node);
      if (method && method.name !== composeMethod) {
        context.report(node, `Forbidden use of \`${method.name}\`. Use \`${composeMethod}\` instead`);
      }
    }
  });
};

const schema = [{
  type: 'string',
  enum: constants.COMPOSITION_METHODS
}];

module.exports = {
  create,
  meta: {
    schema,
    docs: {
      description: 'Enforce a consistent composition method.',
      recommended: 'off',
      url: getDocsUrl(__filename)
    }
  }
};
