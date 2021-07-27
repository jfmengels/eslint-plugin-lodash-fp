'use strict';

const enhance = require('enhance-visitors');
const astUtils = require('eslint-ast-utils');
const lodashUtil = require('./lodash-util');

function isLodashModule(name) {
  return name.indexOf('lodash') === 0;
}

function stripLodash(name) {
  const lodashPath = 'lodash/';
  return name.slice(lodashPath.length);
}

function strippedModuleName(strippedName, name) {
  if (strippedName === 'fp') {
    return 'fp/' + name;
  }
  return name;
}

module.exports = function () {
  const imports = Object.create(null);

  // `ImportDeclaration` and `VariableDeclarator` will find Lodash imports and require()
  // and fill `imports` with what is found
  // The result is a collection of identifier and (method or Lodash) pairs
  const predefinedRules = {
    ImportDeclaration(node) {
      const name = node.source.value;
      if (isLodashModule(name)) {
        const strippedName = stripLodash(name);
        node.specifiers.forEach(specifier => {
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
    VariableDeclarator(node) {
      if (node.init && astUtils.isStaticRequire(node.init)) {
        const name = node.init.arguments[0].value;
        if (isLodashModule(name)) {
          const strippedName = stripLodash(name);
          if (node.id.type === 'Identifier') {
            // `const _ = require('lodash');` --> {'_': ''}
            // `const _ = require('lodash/fp');` --> {'_': 'fp'}
            // `const find = require('lodash/find');` --> {'find': 'find'}
            // `const find = require('lodash/fp/find');` --> {'find': 'fp/find'}
            imports[node.id.name] = strippedName;
          } else if (node.id.type === 'ObjectPattern') {
            node.id.properties.forEach(prop => {
              // `const {find, invoke: i} = require('lodash');` --> {'find': 'find', 'i': 'invoke'}
              // `const {find, invoke: i} = require('lodash/fp');` --> {'find': 'fp/find', 'i': 'fp/invoke'}
              imports[prop.key.name] = strippedModuleName(strippedName, prop.value.name);
            });
          }
        }
      }
    }
  };

  return {
    imports,
    helpers: lodashUtil(imports),
    merge: customHandlers => enhance.mergeVisitors([predefinedRules, customHandlers])
  };
};
