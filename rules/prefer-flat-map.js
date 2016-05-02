'use strict';

var _ = require('lodash/fp');
var enhance = require('./core/enhance');

function findIndexByName(name) {
  return _.findIndex(_.eq(name));
}

var findIndexOfMap = findIndexByName('map');
var findIndexOfFlatten = findIndexByName('flatten');

function hasConsecutiveMapAndFlatten(methods) {
  var mapIndex = findIndexOfMap(methods);
  if (mapIndex === -1) {
    return false;
  }
  var flattenIndex = findIndexOfFlatten(methods);
  if (mapIndex === flattenIndex - 1) {
    return true;
  }
  return hasConsecutiveMapAndFlatten(methods.slice(mapIndex + 1));
}

module.exports = function (context) {
  var info = enhance();

  var isFlattenCall = info.helpers.isMethodCallOf('flatten');
  var isMapCall = info.helpers.isMethodCallOf('map');

  function isDirectCall(node) {
    return isFlattenCall(node) && isMapCall(node.arguments[0]);
  }

  function isCompositionCall(info, node) {
    var composeMethod = info.helpers.isComposeMethod(node);
    if (!composeMethod) {
      return composeMethod;
    }

    var methods = info.helpers.getComposeMethodArgMethods(composeMethod.name, node);
    return hasConsecutiveMapAndFlatten(_.map('name', methods));
  }

  return info.merge({
    CallExpression: function (node) {
      if (isDirectCall(node) || isCompositionCall(info, node)) {
        context.report(node, 'Prefer `_.flatMap` over consecutive `_.map` and `_.flatten`');
      }
    }
  });
};
