'use strict';

var _ = require('lodash/fp');

module.exports = function (imports) {
  var isCallExpression = _.matches({type: 'CallExpression'});

  // Is X the Lodash object?

  function isLodash(id) {
    return imports[id] === 'fp';
  }

  function isVanillaLodash(id) {
    return imports[id] === '';
  }

  var isAnyLodash = _.overSome([isLodash, isVanillaLodash]);

  // Is `X()` or `X.Y()` a Lodash method call()?

  var findName = _.curry(function _findName(methods, name) {
    return _.find(_.eq(name), methods);
  });

  function isMemberCall(node) {
    return node.type === 'MemberExpression' &&
      isLodash(node.object.name) &&
      node.property.name;
  }

  function isCall(node) {
    return node.type === 'Identifier' &&
      imports[node.name] !== undefined &&
      imports[node.name].replace('fp/', '');
  }

  var isLodashCall = function _isLodashCall(node) {
    if (!isCallExpression(node)) {
      return false;
    }
    return isMemberCall(node.callee) || isCall(node.callee);
  };

  var isLodashCallOf = _.curry(function _isLodashCallOf(_methods, node) {
    var methods = _.isArray(_methods) ? _methods : [_methods];
    var name = isLodashCall(node);
    return name && findName(methods, name);
  });

  // Is X a Lodash method?

  var isMethod = _.curry(function _isMethod(_methods, id) {
    var methods = _.isArray(_methods) ? _methods : [_methods];
    var imp = imports[id];
    return imp && _.startsWith('fp/', imp) && _.find(_.eq(imp.replace('fp/', '')), methods);
  });

  var isVanillaMethod = _.curry(function _isVanillaMethod(_methods, id) {
    var methods = _.isArray(_methods) ? _methods : [_methods];
    var imp = imports[id];
    return imp && _.find(_.eq(imp), methods);
  });

  var isAnyMethod = _.curry(function _isAnyMethod(_methods, id) {
    return isMethod(_methods, id) || isVanillaMethod(_methods, id);
  });

  return {
    isAnyLodash: isAnyLodash,
    isLodash: isLodash,
    isVanillaLodash: isVanillaLodash,

    isLodashCall: isLodashCall,
    isLodashCallOf: isLodashCallOf,

    isAnyMethod: isAnyMethod,
    isMethod: isMethod,
    isVanillaMethod: isVanillaMethod
  };
};
