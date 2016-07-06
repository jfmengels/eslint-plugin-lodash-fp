# Prefer [`_.identity`] over functions returning their argument

When you want a function that takes one argument and always returns the argument directly, it can be more concise to use [`_.identity`].

## Options

This rule supports the following options:

`arrowFunctions`: Whether or not to to report arrow functions. Default is `false`, meaning arrow functions will not get reported.

You can set the options like this:

```js
"lodash-fp/prefer-identity": ["error", {"arrowFunctions": true}]
```

### Fail

```js
function id(x) {
  return x;
}

_.filter(function id(x) {
  return x;
}, array);

// When including arrow functions
const id = (x) => x;
const id = (x) => { return x; };
```

### Pass

```js
function foo(y, x) {
  return x;
}

_.filter(_.identity, array);

// When not including arrow functions
_.filter((x) => x, array);
```

## When Not To Use It

If you do not want to enforce using [`_.identity`], you should not use this rule.

[`_.identity`]: https://lodash.com/docs#identity
