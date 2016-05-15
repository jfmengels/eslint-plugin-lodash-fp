'use strict';

var _ = require('lodash/fp');
var data = require('./lodash-data');
var constants = require('./constants');

module.exports = function (imports) {
  var isIdentifier = _.matches({type: 'Identifier'});
  var isCallExpression = _.matches({type: 'CallExpression'});
  var isMemberExpression = _.matches({type: 'MemberExpression'});

  function buildInfo(node, varname, _name) {
    if (!_name) {
      return false;
    }

    var name = _name.replace('fp/', '');
    var realName = data.aliasToReal[name] || name;

    return {
      node: node,
      varname: varname,
      name: name,
      realName: realName,
      skipFixed: data.skipFixed[realName] || false,
      ary: data.ary[realName] && _.parseInt(10, data.ary[realName]),
      iterateePos: data.iterateePos[realName],
      iterateeAry: data.iterateeAry[realName],
      spread: data.methodSpread[realName]
    };
  }

  // Is X the Lodash object?

  function isLodash(id) {
    return imports[id] === 'fp';
  }

  function isVanillaLodash(id) {
    return imports[id] === '';
  }

  var isAnyLodash = _.overSome([isLodash, isVanillaLodash]);

  // Is `X()` or `X.Y()` a Lodash method call()?

  var findName = _.curry(function _findName(methods, method) {
    return _.find(_.eq(method.name), methods) && method;
  });

  function isMemberMethod(node) {
    return isMemberExpression(node) &&
      isLodash(node.object.name) &&
      buildInfo(node, node.property.name, node.property.name);
  }

  function isAnyMemberMethod(node) {
    return isMemberExpression(node) &&
      isAnyLodash(node.object.name) &&
      buildInfo(node, node.property.name, node.property.name);
  }

  function isIdentifierMethod(node) {
    return isIdentifier(node) &&
      imports[node.name] !== undefined &&
      buildInfo(node, node.name, imports[node.name]);
  }

  function isMethod(node) {
    return isMemberMethod(node) || isIdentifierMethod(node);
  }

  function isAnyMethod(node) {
    return isAnyMemberMethod(node) || isIdentifierMethod(node);
  }

  var isMethodOf = _.curry(function _isMethodOf(_methods, node) {
    var methods = _.isArray(_methods) ? _methods : [_methods];
    var method = isMethod(node);
    return method && findName(methods, method);
  });

  var isAnyMethodOf = _.curry(function _isAnyMethodOf(_methods, node) {
    var methods = _.isArray(_methods) ? _methods : [_methods];
    var method = isAnyMethod(node);
    return method && findName(methods, method);
  });

  function isMethodCall(node) {
    return isCallExpression(node) && isMethod(node.callee);
  }

  var isMethodCallOf = _.curry(function _isMethodCallOf(_methods, node) {
    var methods = _.isArray(_methods) ? _methods : [_methods];
    var method = isMethodCall(node);
    return method && findName(methods, method);
  });

  // Is `X.Y` a Lodash method?
  var isMember = _.curry(function _isMember(node) {
    return isMemberExpression(node) &&
      isIdentifier(node.object) &&
      isIdentifier(node.property) &&
      isLodash(node.object.name) &&
      buildInfo(node, node.property.name, node.property.name);
  });

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

    isComposeMethod: isMethodCallOf(constants.COMPOSITION_METHODS),
    getComposeMethodArgMethods: getComposeMethodArgMethods
  };
};
