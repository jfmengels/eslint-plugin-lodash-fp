# Limit the use of aliases

Some Lodash methods have one or more aliases, which can lead to inconsistent code and decrease readability. This rule enforces the use of only one of those aliases.

## Options

This rule supports the following options:

`overrides`: A list of strings, that define the prefer alias for a method. Example, if `overrides` is set to `["collect"]`, then it will prefer `collect` to its aliases like `map`.

You can set the options like this:

```js
"lodash-fp/preferred-alias": ["error", {"overrides": ["collect", "__"]}]
```


### Fail

```js
const ids = _.collect(users, 'id'); // Prefer to use `map`

/* eslint lodash-fp/preferred-alias: ["error", {"overrides": ["collect"]}] */
const ids = _.map(users, 'id'); // Prefer to use `collect`
```


### Pass

```js
const ids = _.map(users, 'id');

/* eslint lodash-fp/preferred-alias: ["error", {"overrides": ["collect"]}] */
const ids = _.collect(users, 'id');
```
