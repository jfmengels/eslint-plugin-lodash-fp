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
    getComposeMethod(info, info.imports[node.name].replace('fp/', ''));
}

module.exports = function (context) {
  var info = enhance();

  return info.merge({
    CallExpression: function (node) {
      if (node.arguments.length > 1) {
        return;
      }
      var callee = node.callee;
      var name = isMemberCall(info, callee) || isCall(info, callee);
      if (name !== false) {
        context.report(node, '`' + name + '` should have at least two arguments');
      }
    }
  });
};
