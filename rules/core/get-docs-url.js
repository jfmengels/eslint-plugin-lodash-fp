'use strict';

const path = require('path');
const pkg = require('../../package');

const REPO_URL = 'https://github.com/jfmengels/eslint-plugin-lodash-fp';
/**
 * Return the URL of the rule's documentation, either from parameter or the
 * requiring file's name.
 * @param  {String} ruleFile The file path of the rule to generate a URL for.
 * @return {String}          The URL of the rule's documentation.
 */
const getDocsUrl = ruleFile => {
  const ruleName = path.basename(ruleFile, '.js');
  return `${REPO_URL}/blob/v${pkg.version}/docs/rules/${ruleName}.md`;
};

module.exports = getDocsUrl;
