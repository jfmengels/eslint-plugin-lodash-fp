'use strict';

var _ = require('lodash/fp');
var lodashUtil = require('./lodashUtil');
var isStaticRequire = require('./staticRequire');

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

module.exports = function enhance() {
  var imports = {};

  // `ImportDeclaration` and `VariableDeclarator` will find Lodash imports and require()
  // and fill `imports` with what is found
  // The result is a collection of identifier and (method or Lodash) pairs
  var predefinedRules = {
    ImportDeclaration: function (node) {
      var name = node.source.value;
      if (isLodashModule(name)) {
        var strippedName = stripLodash(name);
        node.specifiers.forEach(function (specifier) {
          if (specifier.type === 'ImportDefaultSpecifier') {
            // `import _ from 'lodash';` --> {'_': ''}
            // `import _ from 'lodash/fp';` --> {'_': 'fp'}
            // `import find from 'lodash/find';` --> {'find': 'find'}
            // `import find from 'lodash/fp/find';` --> {'find': 'fp/find'}
            imports[specifier.local.name] = strippedName;
          } else if (specifier.type === 'ImportSpecifier') {
            // `import {find, invoke as i} from 'lodash';` --> {'find': 'find', 'i': 'invoke'}
            // `import {find, invoke as i} from 'lodash/fp';` --> {'find': 'fp/find', 'i': 'fp/invoke'}
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
            // `var _ = require('lodash');` --> {'_': ''}
            // `var _ = require('lodash/fp');` --> {'_': 'fp'}
            // `var find = require('lodash/find');` --> {'find': 'find'}
            // `var find = require('lodash/fp/find');` --> {'find': 'fp/find'}
            imports[node.id.name] = strippedName;
          } else if (node.id.type === 'ObjectPattern') {
            node.id.properties.forEach(function (prop) {
              // `var {find, invoke: i} = require('lodash');` --> {'find': 'find', 'i': 'invoke'}
              // `var {find, invoke: i} = require('lodash/fp');` --> {'find': 'fp/find', 'i': 'fp/invoke'}
              imports[prop.key.name] = strippedModuleName(strippedName, prop.value.name);
            });
          }
        }
      }
    }
  };

  return {
    imports: imports,
    helpers: lodashUtil(imports),
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

      return _.assign(customHandlers, predefinedRules);
    }
  };
};
