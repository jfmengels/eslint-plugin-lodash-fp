# eslint-plugin-lodash-fp [![Build Status](https://travis-ci.org/jfmengels/eslint-plugin-lodash-fp.svg?branch=master)](https://travis-ci.org/jfmengels/eslint-plugin-lodash-fp)

ESLint rules for lodash/fp


## Install

```
$ npm install --save-dev eslint eslint-plugin-lodash-fp
```

## Usage

Configure it in `package.json`.

```json
{
	"name": "my-awesome-project",
	"eslintConfig": {
		"env": {
			"es6": true
		},
		"parserOptions": {
			"ecmaVersion": 7,
			"sourceType": "module"
		},
		"plugins": [
			"lodash-fp"
		],
		"rules": {
			"lodash-fp/no-chain": "off",
			"lodash-fp/use-fp": "off"
		}
	}
}
```


## Rules

- [no-chain](docs/rules/no-chain.md) - Forbid the use of `_.chain`.
- [use-fp](docs/rules/use-fp.md) - Use lodash/fp instead of Lodash.

## Recommended configuration

This plugin exports a [`recommended` configuration](index.js) that enforces good practices.

To enable this configuration, use the `extends` property in your `package.json`.

```json
{
	"name": "my-awesome-project",
	"eslintConfig": {
		"plugins": [
			"lodash-fp"
		],
		"extends": "plugin:lodash-fp/recommended"
	}
}
```

See [ESLint documentation](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) for more information about extending configuration files.

**Note**: This configuration will also enable the correct [parser options](http://eslint.org/docs/user-guide/configuring#specifying-parser-options) and [environment](http://eslint.org/docs/user-guide/configuring#specifying-environments).

MIT © [Jeroen Engels](https://github.com/jfmengels)
