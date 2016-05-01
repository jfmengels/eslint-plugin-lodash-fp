'use strict';

var enhance = require('./core/enhance');
var isStaticRequire = require('./core/static-require');

function reportIfLodashButNotFp(context, node, name) {
  if (name && name.indexOf('lodash') === 0 && name.indexOf('lodash/fp') === -1) {
    context.report(node, 'Unallowed import of `lodash`. Use `lodash/fp` instead');
  }
}

module.exports = function (context) {
  var info = enhance();

  return info.merge({
    ImportDeclaration: function (node) {
      reportIfLodashButNotFp(context, node, node.source.value);
    },
    CallExpression: function (node) {
      if (isStaticRequire(node)) {
        reportIfLodashButNotFp(context, node, node.arguments[0].value);
      }
    }
  });
};
