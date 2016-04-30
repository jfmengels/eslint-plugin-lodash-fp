'use strict';

var _ = require('lodash/fp');

module.exports = function (imports) {
  var isIdentifier = _.matches({type: 'Identifier'});
  var isCallExpression = _.matches({type: 'CallExpression'});
  var isMemberExpression = _.matches({type: 'MemberExpression'});

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

  function isMemberMethod(node) {
    return isMemberExpression(node) &&
      isLodash(node.object.name) &&
      node.property.name;
  }

  function isAnyMemberMethod(node) {
    return isMemberExpression(node) &&
      isAnyLodash(node.object.name) &&
      node.property.name;
  }

  function isIdentifierMethod(node) {
    return isIdentifier(node) &&
      imports[node.name] !== undefined &&
      imports[node.name].replace('fp/', '');
  }

  function isMethod(node) {
    return isMemberMethod(node) || isIdentifierMethod(node);
  }

  function isAnyMethod(node) {
    return isAnyMemberMethod(node) || isIdentifierMethod(node);
  }

  var isMethodOf = _.curry(function _isMethodOf(_methods, node) {
    var methods = _.isArray(_methods) ? _methods : [_methods];
    var name = isMethod(node);
    return name && findName(methods, name);
  });

  var isAnyMethodOf = _.curry(function _isAnyMethodOf(_methods, node) {
    var methods = _.isArray(_methods) ? _methods : [_methods];
    var name = isAnyMethod(node);
    return name && findName(methods, name);
  });

  function isMethodCall(node) {
    return isCallExpression(node) && isMethod(node.callee);
  }

  var isMethodCallOf = _.curry(function _isMethodCallOf(_methods, node) {
    var methods = _.isArray(_methods) ? _methods : [_methods];
    var name = isMethodCall(node);
    return name && findName(methods, name);
  });

  // Is `X.Y` a Lodash method?
  var isMember = _.curry(function _isMember(node) {
    return isMemberExpression(node) &&
      isIdentifier(node.object) &&
      isIdentifier(node.property) &&
      isLodash(node.object.name) &&
      node.property.name;
  });

  var compositionMethods = ['compose', 'flow', 'flowRight', 'pipe'];

  var getComposeMethodArgMethods = _.curry(function _getComposeMethodArgMethods(name, node) {
    var methodNames = node.arguments.map(function (arg) {
      return isMethodCall(arg) || isMember(arg);
    });
    if (name === 'flowRight' || name === 'compose') {
      return _.reverse(methodNames);
    }
    return methodNames;
  });

  return {
    isIdentifier: isIdentifier,
    isCallExpression: isCallExpression,
    isMemberExpression: isMemberExpression,

    isAnyLodash: isAnyLodash,
    isLodash: isLodash,
    isVanillaLodash: isVanillaLodash,

    isMethodCall: isMethodCall,
    isMethodCallOf: isMethodCallOf,

    isMethod: isMethod,
    isMethodOf: isMethodOf,
    isAnyMethodOf: isAnyMethodOf,

    isComposeMethod: isMethodCallOf(compositionMethods),
    getComposeMethodArgMethods: getComposeMethodArgMethods
  };
};
