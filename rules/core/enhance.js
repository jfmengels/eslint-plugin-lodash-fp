'use strict';

var assign = require('lodash.assign');

function isStaticRequire(node) {
  return node &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'require' &&
    node.arguments.length === 1 &&
    node.arguments[0].type === 'Literal';
}

function isLodashModule(name) {
  return name.indexOf('lodash') === 0;
}

function stripLodash(name) {
  var lodashPath = 'lodash/';
  return name.slice(lodashPath.length);
}

function strippedModuleName(strippedName, name) {
  if (strippedName === 'fp') {
    return 'fp/' + name;
  }
  return name;
}

/* eslint quote-props: [2, "as-needed"] */
module.exports = function createAvaRule() {
  var imports = {};

  var predefinedRules = {
    ImportDeclaration: function (node) {
      var name = node.source.value;
      if (isLodashModule(name)) {
        var strippedName = stripLodash(name);
        node.specifiers.forEach(function (specifier) {
          if (specifier.type === 'ImportDefaultSpecifier') {
            imports[specifier.local.name] = strippedName;
          } else if (specifier.type === 'ImportSpecifier') {
            imports[specifier.local.name] = strippedModuleName(strippedName, specifier.imported.name);
          }
        });
      }
    },
    VariableDeclarator: function (node) {
      if (node.init && isStaticRequire(node.init)) {
        var name = node.init.arguments[0].value;
        if (isLodashModule(name)) {
          var strippedName = stripLodash(name);
          if (node.id.type === 'Identifier') {
            imports[node.id.name] = strippedName;
          } else if (node.id.type === 'ObjectPattern') {
            node.id.properties.forEach(function (prop) {
              imports[prop.key.name] = strippedModuleName(strippedName, prop.value.name);
            });
          }
        }
      }
    },
    'Program:exit': function () {
      imports = {};
    }
  };

  var rule = {
    merge: function (customHandlers) {
      Object.keys(predefinedRules).forEach(function (key) {
        var predef = predefinedRules[key];

        if (typeof customHandlers[key] === 'function') {
          predefinedRules[key] = function (node) {
            if (/:exit$/.test(key)) {
              customHandlers[key](node);
              predef(node); // append predefined rules on exit
            } else {
              predef(node); // prepend predefined rules on enter
              customHandlers[key](node);
            }
          };
        }
      });

      return assign({}, customHandlers, predefinedRules);
    }
  };

  Object.defineProperty(rule, 'imports', {
    get: function () {
      return imports;
    }
  });

  rule.is = function is(name, expected, canBeNonFp) {
    if (expected === 'lodash') {
      return imports[name] === 'fp' || (canBeNonFp && imports[name] === '');
    }
    return imports[name] === 'fp/' + expected || (canBeNonFp && imports[name] === expected);
  };

  return rule;
};
