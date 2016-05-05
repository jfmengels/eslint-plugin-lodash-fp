'use strict';

var _ = require('lodash/fp');
var mapping = require('lodash/fp/_mapping');

function methodArities() {
  return _.keys(mapping.aryMethod)
    .map(_.parseInt(10))
    .reduce(function (res, n) {
      mapping.aryMethod[n].forEach(function (name) {
        res[name] = n;
      });
      return res;
    }, {});
}

var ary = methodArities();

function iterateePos() {
  return _.keys(mapping.iterateeAry)
    .reduce(function (res, name) {
      var methodAry = ary[name];
      var rearg = mapping.methodRearg[name] || mapping.aryRearg[methodAry];
      res[name] = rearg[1];
      return res;
    }, {});
}

module.exports = _.assign({
  ary: ary,
  iterateePos: iterateePos()
}, mapping);
