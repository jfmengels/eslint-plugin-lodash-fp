'use strict';

const _ = require('lodash/fp');
const data = require('./lodash-data');
const constants = require('./constants');

module.exports = function (imports) {
  const isIdentifier = _.matches({type: 'Identifier'});
  const isCallExpression = _.matches({type: 'CallExpression'});
  const isMemberExpression = _.matches({type: 'MemberExpression'});

  function buildInfo(info) {
    if (!info.name) {
      return false;
    }

    const name = info.name.replace('fp/', '');
    const realName = data.aliasToReal[name] || name;

    return {
      name,
      realName,
      node: info.node,
      varname: info.varname || info.name,
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

  const isAnyLodash = _.overSome([isLodash, isVanillaLodash]);

  // Is `X()` or `X.Y()` a Lodash method call()?

  const findName = _.curry(function (methods, method) {
    return _.find(_.eq(method.name), _.isArray(methods) ? methods : [methods]) && method;
  });

  function isMemberMethod(node) {
    return isMemberExpression(node) &&
      isLodash(node.object.name) &&
      buildInfo({
        node,
        name: node.property.name
      });
  }

  function isAnyMemberMethod(node) {
    return isMemberExpression(node) &&
      isAnyLodash(node.object.name) &&
      buildInfo({
        node,
        name: node.property.name
      });
  }

  function isIdentifierMethod(node) {
    return isIdentifier(node) &&
      imports[node.name] !== undefined &&
      buildInfo({
        node,
        varname: node.name,
        name: imports[node.name]
      });
  }

  function isMethod(node) {
    return isMemberMethod(node) || isIdentifierMethod(node);
  }

  function isAnyMethod(node) {
    return isAnyMemberMethod(node) || isIdentifierMethod(node);
  }

  const isMethodOf = _.curry(function (methods, node) {
    const method = isMethod(node);
    return method && findName(methods, method);
  });

  const isAnyMethodOf = _.curry(function (methods, node) {
    const method = isAnyMethod(node);
    return method && findName(methods, method);
  });

  function isMethodCall(node) {
    return isCallExpression(node) && isMethod(node.callee);
  }

  const isMethodCallOf = _.curry(function (methods, node) {
    const method = isMethodCall(node);
    return method && findName(methods, method);
  });

  // Is `X.Y` a Lodash method?
  const isMember = _.curry(function (node) {
    return isMemberExpression(node) &&
      isIdentifier(node.object) &&
      isIdentifier(node.property) &&
      isLodash(node.object.name) &&
      buildInfo({
        node,
        name: node.property.name
      });
  });

  const getComposeMethodArgMethods = _.curry(function (name, node) {
    const methodNames = node.arguments.map(function (arg) {
      return isMethodCall(arg) || isMember(arg);
    });
    if (name === 'flowRight' || name === 'compose') {
      return _.reverse(methodNames);
    }
    return methodNames;
  });

  return {
    isIdentifier,
    isCallExpression,
    isMemberExpression,

    isAnyLodash,
    isLodash,
    isVanillaLodash,

    isMethodCall,
    isMethodCallOf,

    isMethod,
    isMethodOf,
    isAnyMethodOf,

    isComposeMethod: isMethodCallOf(constants.COMPOSITION_METHODS),
    isForEachMethod: isMethodCallOf(constants.FOREACH_METHODS),
    getComposeMethodArgMethods
  };
};
