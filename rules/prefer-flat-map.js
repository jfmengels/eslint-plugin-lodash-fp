'use strict';

const _ = require('lodash/fp');
const enhance = require('./core/enhance');

function findIndexByName(name) {
  return _.findIndex(_.eq(name));
}

const findIndexOfMap = findIndexByName('map');
const findIndexOfFlatten = findIndexByName('flatten');

function hasConsecutiveMapAndFlatten(methods) {
  const mapIndex = findIndexOfMap(methods);
  if (mapIndex === -1) {
    return false;
  }
  const flattenIndex = findIndexOfFlatten(methods);
  if (mapIndex === flattenIndex - 1) {
    return true;
  }
  return hasConsecutiveMapAndFlatten(methods.slice(mapIndex + 1));
}

const create = function (context) {
  const info = enhance();

  const isFlattenCall = info.helpers.isMethodCallOf('flatten');
  const isMapCall = info.helpers.isMethodCallOf('map');

  function isDirectCall(node) {
    return isFlattenCall(node) && isMapCall(node.arguments[0]);
  }

  function isCompositionCall(info, node) {
    const composeMethod = info.helpers.isComposeMethod(node);
    if (!composeMethod) {
      return composeMethod;
    }

    const methods = info.helpers.getComposeMethodArgMethods(composeMethod.name, node);
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

module.exports = {
  create,
  meta: {
    docs: {
      description: 'Prefer [`_.flatMap`](https://lodash.com/docs#flatMap) over consecutive [`_.map`](https://lodash.com/docs#map) and [`_.flatten`](https://lodash.com/docs#flatten).',
      recommended: 'error'
    }
  }
};
