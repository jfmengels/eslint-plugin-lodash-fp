'use strict';

var _ = require('lodash/fp');
var enhance = require('./core/enhance');

function findIndexByName(name) {
  return _.findIndex(_.eq(name));
}

var findIndexOfMap = findIndexByName('map');
var findIndexOfFlatten = findIndexByName('flatten');

function hasConsecutiveMapAndFlatten(methodNames) {
  var mapIndex = findIndexOfMap(methodNames);
  if (mapIndex === -1) {
    return false;
  }
  var flattenIndex = findIndexOfFlatten(methodNames);
  if (mapIndex === flattenIndex - 1) {
    return true;
  }
  return hasConsecutiveMapAndFlatten(methodNames.slice(mapIndex + 1));
}

module.exports = function (context) {
  var info = enhance();

  var isFlattenCall = info.helpers.isLodashCallOf('flatten');
  var isMapCall = info.helpers.isLodashCallOf('map');

  function isDirectCall(node) {
    return isFlattenCall(node) && isMapCall(node.arguments[0]);
  }

  function isCompositionCall(info, node) {
    var name = info.helpers.isComposeMethod(node);
    if (!name) {
      return name;
    }

    var methodNames = info.helpers.getComposeMethodArgMethods(name, node);
    return hasConsecutiveMapAndFlatten(methodNames);
  }

  return info.merge({
    CallExpression: function (node) {
      if (isDirectCall(node) || isCompositionCall(info, node)) {
        context.report(node, 'Prefer `_.flatMap` over consecutive `_.map` and `_.flatten`');
      }
    }
  });
};
