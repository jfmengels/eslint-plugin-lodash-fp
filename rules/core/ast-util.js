'use strict';
const _ = require('lodash/fp');

/**
 * Returns whether the node is a function declaration that has a block
 * @param {Object} node
 * @returns {boolean}
 */
const isFunctionDefinitionWithBlock = _.overSome([
  _.matchesProperty('type', 'FunctionExpression'),
  _.matchesProperty('type', 'FunctionDeclaration'),
  _.matches({type: 'ArrowFunctionExpression', body: {type: 'BlockStatement'}})
]);

/**
 * If the node specified is a function, returns the node corresponding with the first statement/expression in that function
 * @param {Object} node
 * @returns {node|undefined}
 */
const getFirstFunctionLine = _.cond([
    [isFunctionDefinitionWithBlock, _.property(['body', 'body', 0])],
    [_.matches({type: 'ArrowFunctionExpression'}), _.property('body')]
]);

/**
 * Returns whether or not the expression is a return statement
 * @param {Object} exp
 * @returns {boolean|undefined}
 */
const isReturnStatement = _.matchesProperty('type', 'ReturnStatement');

/**
 * Returns the node of the value returned in the first line, if any
 * @param {Object} func
 * @returns {Object|null}
 */
function getValueReturnedInFirstLine(func) {
  const firstLine = getFirstFunctionLine(func);
  if (func) {
    if (isFunctionDefinitionWithBlock(func)) {
      return isReturnStatement(firstLine) ? firstLine.argument : null;
    }
    if (func.type === 'ArrowFunctionExpression') {
      return firstLine;
    }
  }
  return null;
}

/**
 * Returns whether the node is actually computed (x['ab'] does not count, x['a' + 'b'] does
 * @param {Object} node
 * @returns {boolean|undefined}
 */
function isComputed(node) {
  return _.get('computed', node) && node.property.type !== 'Literal';
}

/**
 * Returns whether the two expressions refer to the same object (e.g. a['b'].c and a.b.c)
 * @param {Object} a
 * @param {Object} b
 * @returns {boolean}
 */
function isEquivalentExp(a, b) {
  return _.isEqualWith(function (left, right, key) {
    if (_.includes(key, ['loc', 'range', 'computed', 'start', 'end'])) {
      return true;
    }
    if (isComputed(left) || isComputed(right)) {
      return false;
    }
    if (key === 'property') {
      const leftValue = left.name || left.value;
      const rightValue = right.name || right.value;
      return leftValue === rightValue;
    }
  }, a, b);
}

/**
 * Returns whether the expression is a strict equality comparison, ===
 * @param {Object} node
 * @returns {boolean}
 */
const isEqEqEq = _.matches({type: 'BinaryExpression', operator: '==='});

const isFunction = _.flow(
  _.get('type'),
  _.includes(_, ['FunctionExpression', 'FunctionDeclaration', 'ArrowFunctionExpression'])
);

function isIdentityFunction(node) {
  if (!isFunction(node) || node.params.length !== 1 || !node.body) {
    return false;
  }
  let returnedElement;
  if (node.body.type === 'BlockStatement') {
    const subBody = node.body.body;
    if (subBody.length !== 1 || subBody[0].type !== 'ReturnStatement') {
      return false;
    }
    returnedElement = subBody[0].argument;
  } else {
    returnedElement = node.body;
  }

  return returnedElement.type === 'Identifier' &&
    returnedElement.name === node.params[0].name;
}

module.exports = {
  getValueReturnedInFirstLine,
  isComputed,
  isEquivalentExp,
  isEqEqEq,
  isFunction,
  isIdentityFunction
};
