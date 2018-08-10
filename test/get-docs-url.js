import test from 'ava';

const getDocsUrl = require('../rules/core/get-docs-url');

test('getDocsUrl', t => {
  const base = 'https://github.com/jfmengels/eslint-plugin-lodash-fp';
  const re = new RegExp(`${base}/blob/v[0-9.]+/docs/rules/get-docs-url.md`, 'g');
  t.regex(getDocsUrl(__filename), re);
});
