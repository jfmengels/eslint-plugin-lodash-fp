'use strict';

var enhance = require('./core/enhance');

var composeMethods = ['compose', 'flow', 'flowRight', 'pipe'];
function getComposeMethod(info, name) {
  var index = composeMethods.indexOf(name);
  return composeMethods[index] || false;
}

function isMemberCall(info, node) {
  return node.type === 'MemberExpression' &&
    info.is(node.object.name, 'lodash') &&
    getComposeMethod(info, node.property.name);
}

function isCall(info, node) {
  return node.type === 'Identifier' &&
    info.imports[node.name] !== undefined &&
    getComposeMethod(info, node.name);
}

module.exports = function (context) {
  var info = enhance();
  var composeMethod = context.options[0];
  if (!composeMethod) {
    return {};
  }

  return info.merge({
    CallExpression: function (node) {
      var callee = node.callee;
      var name = isMemberCall(info, callee) || isCall(info, callee);
      if (name !== false && name !== composeMethod) {
        context.report(node, 'Forbidden use of `' + name + '`. Use `' + composeMethod + '` instead');
      }
    }
  });
};

module.exports.schema = [{
  type: 'string',
  enum: ['flow', 'flowRight', 'compose', 'pipe']
}];
