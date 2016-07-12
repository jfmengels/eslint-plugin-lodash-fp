'use strict';

const COMPOSITION_METHODS = ['compose', 'flow', 'flowRight', 'pipe'];
const FOREACH_METHODS = ['forEach', 'forEachRight', 'each', 'eachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight'];
const SIDE_EFFECT_METHODS = FOREACH_METHODS.concat(['bindAll']);

module.exports = {
  COMPOSITION_METHODS,
  FOREACH_METHODS,
  SIDE_EFFECT_METHODS
};
