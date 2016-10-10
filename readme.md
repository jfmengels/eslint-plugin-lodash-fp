# eslint-plugin-lodash-fp [![Build Status](https://travis-ci.org/jfmengels/eslint-plugin-lodash-fp.svg?branch=master)](https://travis-ci.org/jfmengels/eslint-plugin-lodash-fp)

ESLint rules for lodash/fp


## Install

```
$ npm install --save-dev eslint eslint-plugin-lodash-fp
```

## Usage

Configure it in `package.json`.

<!-- EXAMPLE_CONFIGURATION:START -->
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
      "lodash-fp/consistent-compose": "off",
      "lodash-fp/consistent-name": [
        "error",
        "_"
      ],
      "lodash-fp/no-argumentless-calls": "error",
      "lodash-fp/no-chain": "error",
      "lodash-fp/no-extraneous-args": "error",
      "lodash-fp/no-extraneous-function-wrapping": "error",
      "lodash-fp/no-extraneous-iteratee-args": "error",
      "lodash-fp/no-for-each": "off",
      "lodash-fp/no-partial-of-curried": "error",
      "lodash-fp/no-single-composition": "error",
      "lodash-fp/no-submodule-destructuring": "error",
      "lodash-fp/no-unused-result": "error",
      "lodash-fp/prefer-compact": "error",
      "lodash-fp/prefer-composition-grouping": "error",
      "lodash-fp/prefer-constant": [
        "error",
        {
          "arrowFunctions": false
        }
      ],
      "lodash-fp/prefer-flat-map": "error",
      "lodash-fp/prefer-get": "error",
      "lodash-fp/prefer-identity": [
        "error",
        {
          "arrowFunctions": false
        }
      ],
      "lodash-fp/preferred-alias": "off",
      "lodash-fp/use-fp": "error"
    }
  }
}
```
<!-- EXAMPLE_CONFIGURATION:END -->


## Rules

<!-- RULES:START -->
- [consistent-compose](docs/rules/consistent-compose.md) - Enforce a consistent composition method.
- [consistent-name](docs/rules/consistent-name.md) - Enforce a consistent name for Lodash.
- [no-argumentless-calls](docs/rules/no-argumentless-calls.md) - Forbid argument-less calls of Lodash methods.
- [no-chain](docs/rules/no-chain.md) - Forbid the use of [`_.chain`](https://lodash.com/docs#chain)
- [no-extraneous-args](docs/rules/no-extraneous-args.md) - No extraneous arguments to methods with a fixed arity.
- [no-extraneous-function-wrapping](docs/rules/no-extraneous-function-wrapping.md) - Avoid unnecessary function wrapping.
- [no-extraneous-iteratee-args](docs/rules/no-extraneous-iteratee-args.md) - No extraneous parameters in iteratees.
- [no-for-each](docs/rules/no-for-each.md) -  Forbid the use of [`_.forEach`](https://lodash.com/docs#forEach)
- [no-partial-of-curried](docs/rules/no-partial-of-curried.md) - No use of [`_.partial`](https://lodash.com/docs#partial) on curried Lodash methods.
- [no-single-composition](docs/rules/no-single-composition.md) - Enforce at least two methods arguments for composition methods.
- [no-submodule-destructuring](docs/rules/no-submodule-destructuring.md) - Forbid destructuring of Lodash submodules.
- [no-unused-result](docs/rules/no-unused-result.md) - Enforce that the result of a Lodash method call gets used.
- [prefer-compact](docs/rules/prefer-compact.md) - Prefer [`_.compact`](https://lodash.com/docs#compact) over [`_.filter`](https://lodash.com/docs#filter) with identity function.
- [prefer-composition-grouping](docs/rules/prefer-composition-grouping.md) - Prefer grouping similar methods in composition methods.
- [prefer-constant](docs/rules/prefer-constant.md) - Prefer [`_.constant`](https://lodash.com/docs#constant) over functions returning literals.
- [prefer-flat-map](docs/rules/prefer-flat-map.md) - Prefer [`_.flatMap`](https://lodash.com/docs#flatMap) over consecutive [`_.map`](https://lodash.com/docs#map) and [`_.flatten`](https://lodash.com/docs#flatten).
- [prefer-get](docs/rules/prefer-get.md) - Prefer [`_.get`](https://lodash.com/docs#get) over multiple `&&`.
- [prefer-identity](docs/rules/prefer-identity.md) - Prefer [`_.identity`](https://lodash.com/docs#identity) over functions returning their argument.
- [preferred-alias](docs/rules/preferred-alias.md) - Limit the use of aliases.
- [use-fp](docs/rules/use-fp.md) - Use lodash/fp instead of Lodash.

<!-- RULES:END -->

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

MIT © [Jeroen Engels](https://github.com/jfmengels)
