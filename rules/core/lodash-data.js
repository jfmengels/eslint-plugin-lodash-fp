'use strict';

const _ = require('lodash/fp');
const mapping = require('lodash/fp/_mapping');

function methodArities() {
  return _.keys(mapping.aryMethod)
    .map(_.parseInt(10))
    .reduce((res, n) => {
      mapping.aryMethod[n].forEach(name => {
        res[name] = n;
      });
      return res;
    }, {});
}

const ary = methodArities();

function iterateePos() {
  return _.keys(mapping.iterateeAry)
    .reduce((res, name) => {
      const methodAry = ary[name];
      const rearg = mapping.methodRearg[name] || mapping.aryRearg[methodAry];
      res[name] = rearg[1];
      return res;
    }, {});
}

module.exports = _.assign({
  ary,
  iterateePos: iterateePos()
}, mapping);
