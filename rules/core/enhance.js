'use strict';

var _ = require('lodash/fp');
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

/* eslint quote-props: [2, "as-needed"] */
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

      return _.assign(customHandlers, predefinedRules);
    }
  };

  rule.imports = imports;

  /**
   * Checks if the identifier `id` corresponds to Lodash or one of its modules.
   * @param  {string}  id          The name of the identifier.
   * @param  {string}  expected    The name of the method. Special case for 'lodash' which checks for the `lodash` object
   * @param  {boolean}  canBeNonFp If false or undefined, will only check if method is the FP version.
*                              		 If true, will check both FP and
   * @example
   * imports = {
   *   '_': '', // vanilla lodash
   *   'F': 'fp', // FP lodash
   *   'vFind': 'find', // vanilla find
   *   'fpFind': 'fp/find', // FP find
   * }
   *
   * rule.is('_', 'lodash') // => false
   * rule.is('_', 'lodash', true) // => true
   * rule.is('F', 'lodash') // => true
   * rule.is('F', 'lodash', true) // => true
   *
   * rule.is('vFind', 'find') // => false
   * rule.is('vFind', 'find', true) // => true
   * rule.is('fpFind', 'find') // => true
   * rule.is('fpFind', 'find', true) // => true
   *
   * @return {Boolean}            True if the id matches the expected method.
   */
  rule.is = function is(id, expected, canBeNonFp) {
    var imp = imports[id];
    if (expected === 'lodash') {
      return imp === 'fp' || (canBeNonFp && imp === '');
    }
    return imp === 'fp/' + expected || (canBeNonFp && imp === expected);
  };

  return rule;
};
